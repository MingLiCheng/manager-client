// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import axios from './httpfilter'
// 引入element-ui
import ElementUI from 'element-ui'
import {
  Message, MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
Vue.message = Vue.prototype.$message = Message
Vue.messagebox = Vue.prototype.$messagebox = MessageBox


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
