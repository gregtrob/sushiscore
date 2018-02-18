// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import Round from './components/Scorecard/Round'
import User from './components/Scorecard/User'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.component('round-score', Round)
Vue.component('user', User)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
  // ,
  // created () {
  //   // initialize store data structure by submitting action.
  //   this.$store.dispatch('init')
  // }
})
