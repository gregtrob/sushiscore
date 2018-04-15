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
  props: ['userId', 'roundId', 'updateMode'],
  data () {
    return {
      thePlayer: null,
      roundScore: null,
      theUserId: this.userId
    }
  },
  computed: {
    userHasScore () {
      const player = this.getPlayer()
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
      return this.getPlayer()
    },
    scoreForRound () {
      this.getRoundScore().getTotal()
    }
  },
  methods: {
    getPlayer: function () {
      if (this.thePlayer) {
        // console.log('Found right away')
        return this.thePlayer
      }
      let player = this.$store.getters.getUser(this.theUserId)
      this.thePlayer = player
      // console.log(this.thePlayer)
      return this.thePlayer
      // return this.$store.getters.getUser(this.userId)
    },
    getRoundScore: function () {
      const player = this.getPlayer()
      let rs = new RoundScore()
      if (player) {
        rs = player.getRoundScore(this.roundId)
      }
      return rs
    }
  },
  created () {
    const rs = this.getRoundScore()
    // TODO: Add null check if null create a blank one
    if (!rs) {
      this.roundScore = new RoundScore()
    }
    this.roundScore = rs.clone()
  }
}
</script>

<style scoped>
.no-gap {
  padding: 0px;
  margin: 0px;
}
</style>
