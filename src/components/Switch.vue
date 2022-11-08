<template>
  <label :for="id" class="checkbox-label">
    <input :id="id" type="checkbox" :name="props.name" v-model="inputModel" class="checkbox">
    <div :class="{'switch-wrap': true, 'checked': inputModel}">
      <div class="switch"></div>
    </div>
    {{inputModel ? config.onLabel : config.offLabel}}
  </label>
</template>

<script setup>
import { computed } from "vue"
import { nanoid } from "nanoid";

const props = defineProps({
  name: String,
  config: Object,
  modelValue: Boolean
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

const id = nanoid()

</script>

<style scoped lang="less">
.checkbox-label {
  margin: 20px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  .checkbox {
    display: none;
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
}
.switch-wrap {
  width: 44px;
  height: 24px;
  border-radius: 15px;
  background: #efeff3;
  position: relative;
  margin-right: 10px;
  &.checked {
    background: #1155cb;
    .switch {
      left: calc(100% - 22px)
    }
  }
  .switch {
    position: absolute;
    width: 20px;
    height: 20px;
    background: #fff;
    left: 2px;
    top: 2px;
    border-radius: 100%;
    transition: .2s;
  }
}
</style>