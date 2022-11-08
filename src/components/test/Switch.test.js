import { mount } from "@vue/test-utils";
import Switch from "../Switch.vue";
import { describe, expect, test } from "vitest";
import { ref } from "vue";

describe("notification.vue", () => {
  test("renders the correct name attribute", () => {
    const name = "username";
    const wrapper = mount(Switch, {
      props: { name, config: {} },
    });
    expect(wrapper.find("input").attributes("name")).toEqual(name);
  });

  test("renders the correct value", () => {
    const modelValue = false;
    const wrapper = mount(Switch, {
      props: { modelValue, config: {} },
    });
    expect(wrapper.find("input").element.checked).toEqual(modelValue);
  });

  test('should emit "update:modelValue" event when after inputting', () => {
    const wrapper = mount(Switch, {
      props: { config: {} },
    });
    wrapper.find("input").element.checked = true;
    wrapper.find("input").trigger("change");
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual(true);
  });

  test("renders the correct style for checked", () => {
    const modelValue = true;
    const wrapper = mount(Switch, {
      props: { modelValue, config: {} },
    });
    expect(wrapper.find(".switch-wrap").classes()).toContain('checked');
  });

  test("renders the correct style for checked", () => {
    const modelValue = false;
    const wrapper = mount(Switch, {
      props: { modelValue, config: {} },
    });
    expect(wrapper.find(".switch-wrap").classes()).not.toContain('checked');
  });
});
