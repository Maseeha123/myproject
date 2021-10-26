import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import HighchartsVue from 'highcharts-vue'
import action from './mixins/action'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
Vue.use(VueCookies)
Vue.use(HighchartsVue)
Vue.use(FullCalendar)
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('initial', function (value) {
  if (!value) return ''
  value = value.toString().toUpperCase()
  return value
})
Vue.mixin(action)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
