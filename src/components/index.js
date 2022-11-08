import Input from './Input.vue'
import InputNumber from './InputNumber.vue'
import Checkbox from './Checkbox.vue'
import Switch from './Switch.vue'
import Select from './Select.vue'
import FormItem from './FormItem.vue'
import Form from './Form.vue'
import ObjectWrapper from './ObjectWrapper.vue'
import ArrayWrapper from './ArrayWrapper.vue'

const components = [
  { name: 'Input', component: Input },
  { name: 'InputNumber', component: InputNumber },
  { name: 'Checkbox', component: Checkbox },
  { name: 'Switch', component: Switch },
  { name: 'Select', component: Select },
  { name: 'FormItem', component: FormItem },
  { name: 'Form', component: Form },
  { name: 'ObjectWrapper', component: ObjectWrapper },
  { name: 'ArrayWrapper', component: ArrayWrapper },
]

export default {
  install(app) {
    components.forEach(item => app.component(item.name, item.component))
  }
}

export const TypeToName = {
  string: 'Input',
  number: 'InputNumber',
  checkbox: 'Checkbox',
  switch: 'Switch',
  select: 'Select'
}