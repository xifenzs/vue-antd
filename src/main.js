import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Layout, Menu, Icon, Breadcrumb, Drawer, Radio } from 'ant-design-vue'
import Authorized from './components/Authorized'
import Auth from './directives/auth'

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Drawer)
Vue.use(Radio)
Vue.component("Authorized", Authorized)
Vue.use(Auth)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
