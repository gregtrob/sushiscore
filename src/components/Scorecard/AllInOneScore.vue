<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
          <v-icon v-on:click="setEditMode()" color="cyan darken-2" small v-if="allowEditMode">edit</v-icon>
      </v-layout>
    </v-card-title>
    
    <enter-round-score v-bind:round-id=roundId v-bind:user-id="userId" v-if="inEditMode" @editcomplete="editComplete"></enter-round-score>
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
  props: ['userId', 'roundId', 'parentScoreEditMode', 'parentAllowEditMode'],
  components: {
    'enter-round-score': EnterScoreForRound
  },
  data () {
    return {
      localScoreEditMode: false
    }
  },
  computed: {
    allowEditMode () {
      return !this.$store.getters.isAnyoneEditing
    },
    inEditMode () {
      return this.$store.getters.inEditMode(this.userId, this.roundId)
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
        if (tempRS) {
          rs = tempRS
        }
      }
      return rs
    }
  },
  methods: {
    setEditMode () {
      if (this.localScoreEditMode) {
        // TODO: WTF does this even mean
        // if we're in edit mode we don't do anything here because we dont' allow the icon to do this
        return
      }

      let payload = {
        userId: this.userId,
        roundId: this.roundId
      }
      this.$store.dispatch('setEdit', payload)

      this.localScoreEditMode = !this.localScoreEditMode
    },
    editComplete (payload) {
      this.localScoreEditMode = false
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
