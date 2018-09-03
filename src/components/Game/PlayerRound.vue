<template>
  <div>
      <user v-bind:user-id="theUserId" ></user>

      <all-in-one-round-score v-bind:round-id=1 
                              v-bind:user-id="theUserId" 
                              v-bind:parentScoreEditMode="editRound1"
                              ></all-in-one-round-score>
      <all-in-one-round-score v-bind:round-id=2 
                              v-bind:user-id="theUserId" 
                              v-bind:parentScoreEditMode="editRound2"
                              ></all-in-one-round-score>    
      <all-in-one-round-score v-bind:round-id=3 
                              v-bind:user-id="theUserId" 
                              v-bind:parentScoreEditMode="editRound3"
                              ></all-in-one-round-score>      
  </div>

</template>
<script>

import User from '../User/User'
import AllInoOneScoreForRound from '../Scorecard/AllinOneScore'

export default {
  props: ['userId'],
  components: {
    'user': User,
    'all-in-one-round-score': AllInoOneScoreForRound
  },
  computed: {
    editRound1 () {
      return this.getEditDetails(1)
    },
    editRound2 () {
      return this.getEditDetails(2)
    },
    editRound3 () {
      return this.getEditDetails(3)
    },
    theUserId () {
      return this.userId
    }
  },
  methods: {
    getEditDetails: function (roundId) {
      const editDetails = this.$store.getters.getEditDetails
      if (!editDetails) {
        return false
      }

      if (editDetails.userId !== this.userId) {
        return false
      }

      if (editDetails.roundId === roundId) {
        return true
      }

      return false
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
