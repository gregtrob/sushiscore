<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
          <v-icon v-on:click="setEditMode()" color="cyan darken-2" small v-if="!this.parentScoreEditMode">edit</v-icon>
      </v-layout>
    </v-card-title>
    
    <enter-round-score v-bind:round-id=roundId v-bind:user-id="userId" v-if="inEditMode"></enter-round-score>
    <v-card-text justify-center v-else>
      <div v-if="userHasScore">
        <div class="text-md-center">Your score for the round was {{ scoreForRound.getTotal() }}.  You had {{ scoreForRound.makiPoints }} maki points.  You had {{ scoreForRound.puddingCards }} pudding cards.</div>          
      </div>
      <div v-else>
        No score yet
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { RoundScore } from '@/store/services/score'
import EnterScoreForRound from '../Scorecard/EnterScoreForRound'

export default {
  props: ['userId', 'roundId', 'parentScoreEditMode'],
  components: {
    'enter-round-score': EnterScoreForRound
  },
  data () {
    return {
      localScoreEditMode: this.parentScoreEditMode
    }
  },
  computed: {
    inEditMode () {
      return this.localScoreEditMode
    },
    userHasScore () {
      const player = this.player
      if (!player) {
        return false
      }

      const score = player.getRoundScore(this.roundId)
      if (score) {
        return true
      }

      return false
    },
    player () {
      // return this.getPlayer()
      console.log('UID' + this.userId)
      if (this.userId === null) {
        return null
      }

      return this.$store.getters.getUser(this.userId)
    },
    scoreForRound () {
      let rs = new RoundScore()

      if (!this.userHasScore) {
        return rs
      }

      const player = this.player
      if (player) {
        let tempRS = player.getRoundScore(this.roundId)
        console.log(tempRS)

        if (tempRS) {
          rs = tempRS
        }
      }

      console.log(rs)
      return rs
    }
  },
  methods: {
    setEditMode () {
      this.localScoreEditMode = !this.localScoreEditMode
    }
  }

}
</script>

<style scoped>
.no-gap {
  padding: 0px;
  margin: 0px;
}
</style>
