<template>
  <div class="form-item">
    <div class="title">{{ label }}</div>
    <div class="input-wrap">
      <component :is="TypeToName[type]" :data="props.data" v-model="model" :config="props.config" />
      <div class="error-wrap" v-if="!valid">
        <div class="error" v-for="item in error" :key="item.name">{{item.message}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject, getCurrentInstance, computed } from "vue";
import { FORMKEY } from '../constant'
import { TypeToName } from "../components";

const { link } = inject(FORMKEY, null)
const currentInstance = getCurrentInstance()
Object.assign(currentInstance, { validate })
link(currentInstance)

const props = defineProps({
  label: String,
  name: String,
  type: String,
  data: Array,
  config: Object,
  validator: Object,
  modelValue: undefined,
});

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})

const valid = ref(true)
const error = ref([])

watch(
  () => model.value,
  () => {
    // handle validator
    validate()
  }
);

function validate() {
  return new Promise(resolve => {
    const value = model.value
    runAllValidator(value).then(res => {
      if (res && res.length > 0) {
        valid.value = false
        error.value = res
      } else {
        valid.value = true
        error.value = []
      }
      resolve(valid.value)
    })
  })
}

function runAllValidator(value) {
  return new Promise(resolve => {
    const { validator } = props
    if (validator) {
      const res = Object.entries(validator).reduce((pre, item) => {
        const result = runValidator(item, value)
        if (result) {
          pre.push(result)
        }
        return pre
      }, [])
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

function runValidator(validator, value) {
  const [type, data] = validator
  if (type === 'pattern' && data && !new RegExp(data).test(String(value))) {
    return {
      name: props.name,
      message: `validator pattern: /${data}/ does not pass`
    }
  }
  if (type === 'one_of' && data && !data.includes(value)) {
    return {
      name: props.name,
      message: `Please input one of these: ${data}`
    }
  }
  if (type === 'match_none' && data && data.includes(value)) {
    return {
      name: props.name,
      message: `Please do not input one of them:  ${data}`
    }
  }
  if (type === 'maximum' && data !== undefined && data < Number(value)) {
    return {
      name: props.name,
      message: `The maximum value is: ${data}`
    }
  }
  if (type === 'minimum' && data !== undefined && data > Number(value)) {
    return {
      name: props.name,
      message: `The minimum value is: ${data}`
    }
  }
  if (type === 'integer' && data && !/^-?[1-9]\d*$/.test(value)) {
    return {
      name: props.name,
      message: `expected an integer`
    }
  }

  return false
}

defineExpose({
  validate
})
</script>

<style scoped lang="less">
.form-item {
  margin-bottom: 10px;
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #262626;
    margin: 0 0 8px 0;
  }
}
.error-wrap {
  padding: 10px 15px;
  .error {
    color: #99001a;
    font-size: 14px;
  }
}
</style>
