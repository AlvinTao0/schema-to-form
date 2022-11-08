<template>
  <select class="input-common" :name="name" v-model="inputModel">
    <option v-for="item in data" :key="item.value" :value="item.value">{{item.label}}</option>
  </select>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  name: String,
  modelValue: String,
  data: Array
})
const emit = defineEmits(['update:modelValue'])

const inputModel = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})

</script>

<style scoped lang="less">
</style>