export function runAllValidator(validatorObject, value, propName) {
  return new Promise(resolve => {
    if (validatorObject) {
      const res = getAllValidatorResult(validatorObject, value, propName)
      if (res.length > 0) {
        resolve(res)
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}

export function runValidator(type, data, value, propName) {
  const isEmpty = value === undefined || value === ''

  // single check
  if (type === 'pattern' && data && !new RegExp(data).test(String(value))) {
    return {
      name: propName,
      message: `validator pattern: /${data}/ does not pass`
    }
  }
  if (type === 'minLength' && data && (isEmpty || data > value.length)) {
    return {
      name: propName,
      message: `The minimum length is ${data}`
    }
  }
  if (type === 'maxLength' && data && (isEmpty || data < value.length)) {
    return {
      name: propName,
      message: `The maximum length is ${data}`
    }
  }
  if (type === 'maximum' && data !== undefined && data < Number(value)) {
    return {
      name: propName,
      message: `The maximum value is: ${data}`
    }
  }
  if (type === 'minimum' && data !== undefined && data > Number(value)) {
    return {
      name: propName,
      message: `The minimum value is: ${data}`
    }
  }
  if (type === 'integer' && data && !/^-?[1-9]\d*$/.test(value)) {
    return {
      name: propName,
      message: `expected an integer`
    }
  }

  // Combination check
  if (type === 'one_of' && data) {
    const res = getAllValidatorResult(data, value, propName)
    const count = Object.keys(data).length
    if (res && res.length === count) {
      return {
        name: propName,
        message: `Please input one of these: ${JSON.stringify(data)}`
      }
    }
  }
  if (type === 'match_none' && data) {
    const res = getAllValidatorResult(data, value, propName)
    if (res && res.length > 0) {
      return {
        name: propName,
        message: `Please do not input one of them: ${JSON.stringify(data)}`
      }
    }
  }
 

  return false
}

export function getAllValidatorResult(validatorObject, value, propName) {
  const res = Object.entries(validatorObject).reduce((pre, item) => {
    const [type, data] = item
    const result = runValidator(type, data, value, propName)
    if (result) {
      pre.push(result)
    }
    return pre
  }, [])
  return res
}