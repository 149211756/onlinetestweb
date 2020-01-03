// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import $ from 'jquery'
import ElementUI from 'element-ui';//引入element ui
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';


//引入了拼图验证码组件
import SlideVerify from 'vue-monoplasty-slide-verify';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
} from '@fortawesome/free-solid-svg-icons';
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCoffee)
library.add(
  faUser,
);
Vue.use(Vant);
Vue.prototype.websiteUrl='http://localhost:8888'
// Vue.prototype.websiteUrl='http://115.28.136.14:8080'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// Vue.prototype.$qs = qs
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(SlideVerify); //使用滑块验证组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  components: { App },
  template: '<App/>'
})
