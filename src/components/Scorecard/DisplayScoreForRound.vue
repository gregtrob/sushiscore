<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
      </v-layout>
    </v-card-title>
    <v-card-text justify-center>
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

export default {
  props: ['userId', 'roundId'],
  data () {
    return {
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
  }
}
</script>

<style scoped>
.no-gap {
  padding: 0px;
  margin: 0px;
}
</style>
