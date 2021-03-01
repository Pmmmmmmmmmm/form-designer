import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import './style/public.css'
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')






