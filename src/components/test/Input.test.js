import { mount } from "@vue/test-utils";
import Input from "../Input.vue";
import { describe, expect, test } from "vitest"
import { ref } from 'vue'

describe("notification.vue", () => {
  test("renders the correct name attribute", () => {
    const name = "username"
    const wrapper = mount(Input, {
      props: { name }
    })
    expect(wrapper.attributes('name')).toEqual(name)
  })

  test("renders the correct value", () => {
    const modelValue = '100'
    const wrapper = mount(Input, {
      props: { modelValue }
    })
    expect(wrapper.element.value).toEqual(modelValue)
  })

  test('should emit "update:modelValue" event when after inputting', () => {
    const wrapper = mount(Input)
    wrapper.element.value = '1'
    wrapper.trigger('input')
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('1')
  })
});
