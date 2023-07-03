import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router'

import { currency, date } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import VueSweetalert2 from 'vue-sweetalert2'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$filters = {
  date, currency
}
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
// 正常來說不建議太多方法掛 Global，這裡可以使用 provide 來處理
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(VueAxios, axios)
app.use(router)
app.use(VueSweetalert2)

// 採用全域註冊，任何地方都有可能用到
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
