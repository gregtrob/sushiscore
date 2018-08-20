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
    players: [],
    editUserId: null,
    editRoundId: 0,
    inProgress: false
  },
  mutations: {
    setScoreForRound (state, payload) {
      // I think if you find the player then you must remove them from the array
      // then update it at the end
      let player = null
      if (payload.id) {
        // console.log('In payload.id')
        player = state.players.find(function isId (statePlayer) {
          const val = statePlayer.id === payload.id
          // console.log(val)
          // console.log('State Player' + statePlayer)
          return val
        })
      }

      if (!player) {
        player = new Player()
        state.players.push(player)
      }

      // console.log(state.players)
      // console.log('Round id is ' + payload.roundId)
      // console.log(typeof (payload.roundId))
      // console.log(payload.rs)
      const stringRoundId = payload.roundId.toString()
      if (stringRoundId === '1') {
        player.rs1 = payload.rs
      } else if (stringRoundId === '2') {
        player.rs2 = payload.rs
      } else if (stringRoundId === '3') {
        player.rs3 = payload.rs
      }

      // turn off editing player
      state.editUserId = null
      // do we need to ensure editUserId equals the payload user id?
    },
    setEdit (state, payload) {
      state.editRoundId = payload.roundId
      state.editUserId = payload.userId
    },
    // setEndOfGameScore (state, payload) {
    // },
    // setUsername (state, payload) {
    //   console.log(payload)
    // },
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
    setScoreForRound ({commit, getters}, payload) {
      commit('setScoreForRound', payload)
    },
    setEdit ({commit}, payload) {
      commit('setEdit', payload)
    }
  },
  getters: {
    getEditDetails (state) {
      return {
        userId: state.editUserId,
        roundId: state.editRoundId
      }
    },
    isAnyoneEditing (state) {
      // console.log(state.editUserId)
      return state.editUserId !== null
    },
    getUser (state) {
      return (userId) => {
        let player = state.players.find(function isId (statePlayer) {
          return statePlayer.id === userId
        })

        return player
      }
    },
    getUsers (state) {
      // console.log(state.players)
      return state.players
    },
    isGameActive (state) {
      // console.log(state.players)
      if (state.players.length <= 1) {
        // console.log('Return false')
        // there must be more than one player to be active
        return false
      }

      // here we look do all players have a score for round 3?
      // if so then we presume it was done.  Do we need a flag that
      // scores were complete?  Maybe ...
      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i]

        const r3 = player.getRoundScore(3)
        if (!r3) {
          // this means nothing was ever entered for round 3 so game must be active
          return true
        }
      }
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
