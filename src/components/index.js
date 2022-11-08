import Input from './Input.vue'
import InputNumber from './InputNumber.vue'
import Checkbox from './Checkbox.vue'
import Radio from './Radio.vue'
import Select from './Select.vue'
import FormItem from './FormItem.vue'
import Form from './Form.vue'

const components = [
  { name: 'Input', component: Input },
  { name: 'InputNumber', component: InputNumber },
  { name: 'Checkbox', component: Checkbox },
  { name: 'Radio', component: Radio },
  { name: 'Select', component: Select },
  { name: 'FormItem', component: FormItem },
  { name: 'Form', component: Form },
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
  radio: 'Radio',
  select: 'Select'
}