<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
      </v-layout>
    </v-card-title>
    <v-card-text justify-center>
      <div v-if="userHasScore">
        <div class="text-md-center">Your score for the round was {{ roundScore.getTotal() }}.  You had {{ roundScore.makiPoints }} maki points.  You had {{ roundScore.puddingCards }} pudding cards.</div>          
      </div>
      <div v-else>
        No score yet
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { RoundScore } from '@/store/services/score'

export default {
  props: ['userId', 'roundId'],
  data () {
    return {
      theUserId: this.userId
    }
  },
  computed: {
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
      this.getRoundScore().getTotal()
    }
  },
  methods: {
    getRoundScore: function () {
      const player = this.player()
      let rs = new RoundScore()
      if (player) {
        rs = player.getRoundScore(this.roundId)
      }
      return rs
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
