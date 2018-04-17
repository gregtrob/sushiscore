// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import DisplayScoreForRound from './components/Scorecard/DisplayScoreForRound'
import EnterScoreForRound from './components/Scorecard/EnterScoreForRound'
import User from './components/Scorecard/User'
import PlayerRound from './components/PlayerRound'
import AddUser from './components/AddUser'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.component('display-round-score', DisplayScoreForRound)
Vue.component('enter-round-score', EnterScoreForRound)
Vue.component('user', User)
Vue.component('player-round', PlayerRound)
Vue.component('add-user', AddUser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
