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
    playerEditIndex: -1,
    editRoundId: 0, // what is the intended diff in these two
    scoreRoundId: 0, // between edit round id and score round id - score is intended to be as you loop through
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

      // TODO: Here is where when the edit is done we need to check
      // Was this a round eidt?  if so then move on the next player
      // if the end e.g. last round and last user then trigger "winner winner"
      if (state.playerEditIndex !== null || state.playerEditIndex !== -1) {
        // TODO: Inside here we need to use the same logic as
        // the startScoreForRound to set payload/etc
        let localEditIndex = state.playerEditIndex
        let roundId = state.editRoundId
        let scoreUserId = state.editUserId

        if (localEditIndex + 1 < state.players.length) {
          localEditIndex = localEditIndex + 1
          scoreUserId = state.players[localEditIndex].id
        } else {
          // End of round editing
          localEditIndex = -1
          scoreUserId = null

          if (state.scoreRoundId === 3) {
            // trigger Winner
            console.log('Winner is TBD')
          }
        }

        const payload = {
          userId: scoreUserId,
          roundId: roundId,
          editIndex: localEditIndex
        }
        // commit('setEdit', payload) TRYING THIS WHICH IS CORRECT
        // TODO: This is ugly copying code around need to find right fix
        state.editRoundId = payload.roundId
        state.editUserId = payload.userId

        if (typeof payload.editIndex !== 'undefined') {
          state.playerEditIndex = payload.editIndex
        }
      }
    },
    setEdit (state, payload) {
      console.log('In setEdit')
      state.editRoundId = payload.roundId
      state.editUserId = payload.userId

      if (typeof payload.editIndex !== 'undefined') {
        state.playerEditIndex = payload.editIndex
      }
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
    },
    startRoundScore ({commit, state, dispatch}) {
      // instead of a plaer id use an index
      // if that index > length then up the round score id and don't send the payload and set index to none (or 0)
      // if the round score id goes to 4 then kick off the celebrate page
      console.log('In start Round score')
      let scoreUserId = -1
      let localEditIndex = state.playerEditIndex
      let roundId = state.scoreRoundId
      if (state.players != null) {
        localEditIndex = localEditIndex + 1
        const player = state.players[localEditIndex]

        console.log(player)
        if (player != null) {
          scoreUserId = player.id
        }

        if (state.playerEditIndex === -1 || state.playerEditIndex === null) {
          // we only update the round id if the player edit index was "empty"
          roundId = roundId + 1
        }

        let payload = {
          userId: scoreUserId,
          roundId: roundId,
          editIndex: localEditIndex
        }
        // commit('setEdit', payload) TRYING THIS WHICH IS CORRECT
        dispatch('setEdit', payload)
      }
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
    },
    inEditMode (state) {
      return (playerId, roundId) => {
        console.log('Player id ' + playerId)
        console.log('Round Id' + roundId)
        if (playerId === state.editUserId) {
          console.log('Players equal')
          if (roundId === state.editRoundId) {
            console.log('Rounds equal')
            return true
          }
        }
        return false
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
