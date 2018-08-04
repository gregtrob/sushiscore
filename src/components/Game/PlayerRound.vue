<template>
  <div>
      <user v-bind:user-id="theUserId" ></user>

      <all-in-one-round-score v-bind:round-id=1 v-bind:user-id="theUserId" v-bind:parentScoreEditMode="editRound1" ></all-in-one-round-score>
      <all-in-one-round-score v-bind:round-id=2 v-bind:user-id="theUserId" v-bind:parentScoreEditMode="editRound2" ></all-in-one-round-score>
      <all-in-one-round-score v-bind:round-id=3 v-bind:user-id="theUserId" v-bind:parentScoreEditMode="editRound3" ></all-in-one-round-score>      
      <!-- <display-round-score v-bind:round-id=1 v-bind:user-id="theUserId" v-if="!editRound1" ></display-round-score>
      <enter-round-score v-bind:round-id=1 v-bind:user-id="theUserId" v-else></enter-round-score> 

      <display-round-score v-bind:round-id=2 v-bind:user-id="theUserId" v-if="!editRound2" ></display-round-score>
      <enter-round-score v-bind:round-id=2 v-bind:user-id="theUserId" v-else></enter-round-score>

      <display-round-score v-bind:round-id=3 v-bind:user-id="theUserId" v-if="!editRound3" ></display-round-score>
      <enter-round-score v-bind:round-id=3 v-bind:user-id="theUserId" v-else></enter-round-score> -->
      </div>

</template>
<script>

import User from '../User/User'
import AllInoOneScoreForRound from '../Scorecard/AllinOneScore'

export default {
  props: ['userId', 'addEditRoundId'],
  components: {
    'user': User,
    'all-in-one-round-score': AllInoOneScoreForRound
  },
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
