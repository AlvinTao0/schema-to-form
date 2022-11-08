<template>
  <ObjectWrapper v-if="schema.items.type === 'object'" :schema="schema.items" v-model="model[0]"></ObjectWrapper>
  <ArrayWrapper v-else-if="schema.items.type === 'array'" :schema="schema.items" v-model="model[0]"></ArrayWrapper>
  <FormItem
    v-else
    v-bind="schema.items"
    :model-value="split ? model.join(split) : model[0]"
    @update:modelValue="(val) => onChange(val)"
  ></FormItem>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Object,
  schema: Object,
});

const split = props.schema.split

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue || []
  },
  set(v) {
    emit('update:modelValue', v )
  }
})

const onChange = (val) => {
  model.value = split ? val.split(split) : [ val ]
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
