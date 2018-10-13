<template>

<v-layout justify-center>

    <v-container fluid grid-list-sm v-if="!showWinners">
      <v-layout row wrap justify-center>

        <v-flex xs4 v-for="player in playerList" :key="player.id">
          <v-card id="player.id">
            <player-round :userId='player.id'></player-round>
          </v-card>      
        </v-flex>
      </v-layout>

    <v-layout column class="fab-container">
      <v-btn
        fab
        small
        color="cyan accent-2"
        @click.native.stop="addUser = !addUser"
        v-on:close-add-user="closeAddUser"
      >     
        <v-icon>group_add</v-icon>
      </v-btn>

      <v-btn
        fab
        small
        color="cyan accent-2"
        @click.native.stop="startRoundScore"
        v-on:user-set-score-for-round="setScoreForRound"
      >     
        <v-icon>score</v-icon>
      </v-btn>

    </v-layout>

    </v-container>

    <v-container fluid grid-list-sm v-else>
      Showing winners ... 
      <winner></winner>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="290" v-if="isGameActive">
      <v-card>
        <v-card-title class="headline">Continue existing game?</v-card-title>
        <v-card-text>It appears a game is in progress.  Would you like to continue it or start a new game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" flat @click.native="continueGame">Continue</v-btn>
          <v-btn color="darken-1" flat @click.native="startNewGame">New</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="290" v-else>
      <v-card>
        <v-card-title class="headline">Start a new game</v-card-title>
        <v-card-text>There's nothing here.  Would you like to start a game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" flat @click.native="startNewGame">Yes</v-btn>
          <v-btn color="darken-1" flat @click.native="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <add-user v-bind:addUser='addUser' v-on:close-add-user="closeAddUser()"></add-user>


  </v-layout>
</template>

<script>
// TODO: Figure out why the CSS fails to load when offline
// TODO: Create winner "view"
import RoundScoreDialog from './Scorecard/RoundScoreDialog.vue'
import UserDialog from './User/UserDialog.vue'
import PlayerRound from './Game/PlayerRound.vue'
import Winner from './Game/Winner.vue'

export default {
  name: 'hello',
  components: {
    'add-user': UserDialog,
    'round-score-dialog': RoundScoreDialog,
    'player-round': PlayerRound,
    'winner': Winner
  },
  data () {
    return {
      dialog: true,
      addUser: false,
      roundScore: false,
      newUserName: this.theUserName,
      scoreRoundId: 1,
      playerIndex: -1,

      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  computed: {
    showWinners () {
      console.log(this.$store.getters.showWinners)
      return this.$store.getters.showWinners
    },
    isGameActive () {
      return this.$store.getters.isGameActive
    },
    playerList () {
      const players = this.$store.getters.getUsers
      return players
    },
    setScores () {
      return this.roundScore
    },
    currentScorePlayerId () {
      return this.scoreUserId
    },
    currentScoreRoundId () {
      return this.scoreRoundId
    }
  },
  methods: {
    startNewGame () {
      this.dialog = false
      this.addUser = true
    },
    continueGame () {
      this.dialog = false
      this.$router.push('/playerround')
    },
    closeAddUser (event) {
      console.log('In add user')
      this.addUser = false
    },
    startRoundScore () {
      this.$store.dispatch('startRoundScore')
    },
    setScoreForRound (payload) {
      this.playerIndex = this.playerIndex + 1
      if (this.playerIndex < this.playerList.length) {
        const scoreUserId = this.playerList[this.playerIndex].id

        let payload = {
          userId: scoreUserId,
          roundId: this.scoreRoundId
        }
        this.$store.dispatch('setEdit', payload)
      } else {
        this.playerIndex = -1
        this.scoreRoundId = this.scoreRoundId + 1
        this.roundScore = !this.roundScore

        if (this.roundId === 4) {
          // todo: trigger win
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
