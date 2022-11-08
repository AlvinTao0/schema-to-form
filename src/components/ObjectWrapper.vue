<template>
  <template v-for="item in schema.order" :key="item">
    <ObjectWrapper v-if="schema.properties[item].type === 'object'" :schema="schema.properties[item]" v-model="model[item]"></ObjectWrapper>
    <ArrayWrapper v-else-if="schema.properties[item].type === 'array'" :schema="schema.properties[item]" v-model="model[item]"></ArrayWrapper>
    <FormItem
      v-else
      :name="item"
      v-bind="schema.properties[item]"
      :model-value="model[item]"
      @update:modelValue="(val) => onChange(val, item)"
    ></FormItem>
  </template>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Object,
  schema: Object,
});

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue || {}
  },
  set(v) {
    emit('update:modelValue', v)
  }
})

const onChange = (val, name) => {
  model.value = { ...model.value, [name]: val}
}

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
