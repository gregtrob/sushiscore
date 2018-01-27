import Vue from 'vue'
import Vuex from 'vuex'
import {RoundScore} from '@/store/services/score'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userScores: [
      new RoundScore()
    ],
    // switch to an array for this and utilize a forEach going through it
    // alternatively consider a backing map of the array with the "id" and the
    // array position
    // considering the expected max # of users an array should not be much of a perf hit
    users: new Map([['1', {id: '1', name: 'Fred'}], ['6', {id: '6', name: 'Barney'}]])
  },
  mutations: {
    // setScoreForRound (state, payload) {
    // },
    // setEndOfGameScore (state, payload) {
    // },
    // setUsername (state, payload) {
    //   console.log(payload)
    // },
    addUser (state, payload) {
      state.users.set(payload.id, payload)
    },
    deleteUser (state, payload) {
      state.users.delete(payload.id)
    },
    changeUserName (state, payload) {
      // let userVal = state.users.get(payload.id)
      // userVal.name = payload.name
      // console.log(state.users)
    }
  },
  actions: {
    addUser ({commit, getters}, payload) {
      let theId = getters.users.size + 5
      let user = {
        id: theId.toString(),
        name: payload
      }
      commit('addUser', user)
    },
    changeUserName ({commit}, payload) {
      commit('deleteUser', payload)
      commit('addUser', payload)
    }

  },
  getters: {
    getUser (state) {
      // return 'Fred'
      return (userId) => {
        if (state.users.has(userId.toString())) {
          return state.users.get(userId.toString())
        }
        return 'Unknown'
      }
    },
    getUsers (state) {
      return state.users
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
