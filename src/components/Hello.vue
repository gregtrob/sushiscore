<template>

<v-layout justify-center>

    <v-container fluid grid-list-sm>
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
      >     
        <v-icon>group_add</v-icon>
      </v-btn>

      <v-btn
        fab
        small
        color="cyan accent-2"
        @click.native.stop="startRoundScore"
      >     
        <v-icon>score</v-icon>
      </v-btn>

    </v-layout>

    </v-container>


  
    <v-dialog v-model="dialog" persistent max-width="290" v-if="isGameActive">
      <v-card>
        <v-card-title class="headline">Continue existing game?</v-card-title>
        <v-card-text>It appears a game is in progress.  Would you like to continue it or start a new game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="continueGame">Continue</v-btn>
          <v-btn color="green darken-1" flat @click.native="startNewGame">New</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="290" v-else>
      <v-card>
        <v-card-title class="headline">Start a new game</v-card-title>
        <v-card-text>There's nothing here.  Would you like to start a game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="startNewGame">Yes</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <add-user v-bind:addUser='addUser'></add-user>
    <round-score-dialog v-bind:enterScore='setScores'
                        v-bind:userId='currentScorePlayerId'
                        v-bind:roundId=currentScoreRoundId

    ></round-score-dialog>

    Score id: {{ currentScorePlayerId }}
    Round Id: {{ currentScoreRoundId }}

  </v-layout>
</template>

<script>
import RoundScoreDialog from './Scorecard/RoundScoreDialog.vue'
import UserDialog from './User/UserDialog.vue'
import PlayerRound from './Game/PlayerRound.vue'

export default {
  name: 'hello',
  components: {
    'add-user': UserDialog,
    'round-score-dialog': RoundScoreDialog,
    'player-round': PlayerRound
  },
  data () {
    return {
      dialog: true,
      addUser: false,
      roundScore: false,
      newUserName: this.theUserName,
      scoreUserId: null,
      scoreRoundId: null,

      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  created () {
    this.$on('closeAddUser', function () {
      this.addUser = false
    })
  },
  computed: {
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
      // this.$router.push('/adduser')
      this.addUser = true
    },
    continueGame () {
      this.dialog = false
      this.$router.push('/playerround')
    },
    startRoundScore () {
      const pl = this.playerList
      if (pl != null) {
        console.log('Player 1: ' + pl)
        const firstPlayer = pl[0]
        if (firstPlayer != null) {
          this.scoreUserId = firstPlayer.id
        }
      }

      if (this.scoreRoundId == null) {
        this.scoreRoundId = 0
      }

      this.scoreRoundId = this.scoreRoundId + 1
      this.roundScore = !this.roundScore

      console.log('Player id is ' + this.scoreUserId)
      console.log('Round Id is ' + this.scoreRoundId)
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
