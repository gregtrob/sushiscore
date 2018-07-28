<template>
  <div>
      <user v-bind:user-id="theUserId" ></user>

      <display-round-score v-bind:round-id=1 v-bind:user-id="theUserId" v-if="!editRound1" ></display-round-score>
      <enter-round-score v-bind:round-id=1 v-bind:user-id="theUserId" v-else></enter-round-score>

      <display-round-score v-bind:round-id=2 v-bind:user-id="theUserId" v-if="!editRound2" ></display-round-score>
      <enter-round-score v-bind:round-id=2 v-bind:user-id="theUserId" v-else></enter-round-score>

      <display-round-score v-bind:round-id=3 v-bind:user-id="theUserId" v-if="!editRound3" ></display-round-score>
      <enter-round-score v-bind:round-id=3 v-bind:user-id="theUserId" v-else></enter-round-score>
    
    <!-- <round-score round-id="2" v-bind:user-id="userId" ></round-score>
    <round-score round-id="3" v-bind:user-id="userId" ></round-score> -->
  </div>

</template>
<script>

import User from '../User/User'
import DisplayScoreForRound from '../Scorecard/DisplayScoreForRound'
import EnterScoreForRound from '../Scorecard/EnterScoreForRound'

export default {
  props: ['userId', 'addEditRoundId'],
  components: {
    'user': User,
    'display-round-score': DisplayScoreForRound,
    'enter-round-score': EnterScoreForRound
  },
  // data () {
  //   // return {
  //   //   theUserId: this.userId
  //   // }
  // },
  computed: {
    editRound1 () {
      return this.editRound(1)
    },
    editRound2 () {
      return this.editRound(2)
    },
    editRound3 () {
      return this.editRound(3)
    },
    theUserId () {
      return this.userId
    }

  },
  methods: {
    editRound: function (roundId) {
      if (!this.addEditRoundId) {
        return false
      }
      const stringRoundId = roundId.toString()
      const stringAddEditRoundId = this.addEditRoundId.toString()
      return stringRoundId === stringAddEditRoundId
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
