import Vue from 'vue'
import Vuex from 'vuex'
import {Player} from '@/store/services/score'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // switch to an array for this and utilize a forEach going through it
    // alternatively consider a backing map of the array with the "id" and the
    // array position
    // considering the expected max # of users an array should not be much of a perf hit
    players: []
  },
  mutations: {
    // setScoreForRound (state, payload) {
    // },
    // setEndOfGameScore (state, payload) {
    // },
    // setUsername (state, payload) {
    //   console.log(payload)
    // },
    init (state) {
      state.players = new Map()
    },
    addUser (state, payload) {
      state.players.set(payload.id, payload)
    },
    deleteUser (state, payload) {
      state.users.delete(payload.id)
    },
    changeUserName (state, payload) {
      let player = null
      if (payload.id) {
        player = state.players.find(function isId (statePlayer) {
          return statePlayer.id === payload.id
        })
      }
      if (player) {
        player.name = payload.name
      } else {
        console.log('Creating new player')
        player = new Player(payload.name)
        state.players.push(player)
      }
      payload.id = player.id
    }
  },
  actions: {
    addUser ({commit, getters}, payload) {
      let user = {
        id: payload.id,
        name: payload
      }
      commit('addUser', user)
    },
    changeUserName ({commit}, payload) {
      commit('changeUserName', payload)
    },
    init ({commit}) {
      commit('init')
    }

  },
  getters: {
    getUser (state) {
      return (userId) => {
        let player = state.players.find(function isId (statePlayer) {
          return statePlayer.id === userId
        })

        return player
      }
    },
    getUsers (state) {
      return state.players
    }
    // ,
    // getScoresForRound (state) {
    //   return state.users
    //   // return (meetupId) => {
    //   //   return state.loadedMeetups.find((meetup) => {
    //   //     return meetup.id === meetupId
    //   //   })
    //   // }
    // }
  }
})
