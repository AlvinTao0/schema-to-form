<template>
  <FormItem
    v-for="item in schema.order"
    :key="item"
    v-bind="schema.properties[item]"
    v-model="model"
  ></FormItem>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  modelValue: Object,
  schema: Object,
});

const model = computed({
  get() {
    return props.modelValue || {}
  },
  set(v) {
    emit('update:modelValue', v)
  }
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
