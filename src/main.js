import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import './style/public.css'
import formCreate from '@form-create/element-ui'
Vue.use(formCreate)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')






