<template>
  <form class="form" onsubmit="return false">
    <ObjectWrapper v-if="schema.type === 'object'" :schema="schema" v-model="model"></ObjectWrapper>
    <ArrayWrapper v-else-if="schema.type === 'array'" :schema="schema" v-model="model"></ArrayWrapper>
    <div class="alert-wrap" v-show="hasSubmited">
      <div class="alert" v-if="!valid">schema violation</div>
      <div class="alert success" v-else>schema validation successful</div>
    </div>
    <slot name="btn"></slot>
  </form>
</template>

<script setup>
import { reactive, ref, provide, getCurrentInstance, computed } from "vue";
import { FORMKEY } from '../constant'

const parent = getCurrentInstance()
const children = reactive([])
provide(FORMKEY, {
  parent,
  children,
  link: child => children.push(child)
})

const props = defineProps({
  modelValue: Object,
  schema: Object,
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

const hasSubmited = ref(false)
const valid = ref(true)
const submit = () => {
  const promises = children.map(item => item.validate())
  Promise.all(promises).then(res => {
    hasSubmited.value = true
    if (res.includes(false)) {
      // show error message
      valid.value = false
      return
    } else {
      // fetch api
      valid.value = true
    }
  })
};

defineExpose({
  submit
})
</script>

<style scoped lang="less">
.form {
  max-width: 600px;
  .error {
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 3px;
    background-color: #ffe6ea;
    color: #99001a;
    margin-bottom: 10px;
  }
}
</style>
