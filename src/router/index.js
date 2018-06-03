import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import GamePlay from '@/components/Game/GamePlay'
// import User from '@/components/Scorecard/User'
// import PlayerRound from '@/components/PlayerRound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
    // ,
    // {
    //   path: '/playgame',
    //   name: 'PlayGame',
    //   component: GamePlay
    // },
    // {
    //   path: '/userlist',
    //   name: 'User',
    //   component: User
    // },
    // {
    //   path: '/playerround',
    //   name: 'PlayerRound',
    //   component: PlayerRound
    // }
  ]
})
