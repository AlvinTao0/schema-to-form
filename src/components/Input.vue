<template>
  <input class="input-common" type="text" :name="props.name" v-model="inputModel">
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  name: String,
  modelValue: String
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