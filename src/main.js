import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import components from './components/index.js'

createApp(App).use(router).use(components).mount('#app')
