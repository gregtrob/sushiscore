<template>
  <v-container fluid>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
      </v-layout>
    </v-card-title>
    <v-card-text>
        <v-layout row wrap>
          <v-container xs3 fluid>
            <v-form @submit.prevent="handleSubmit">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    name="makiPoints"
                    label="Maki Points"
                    id="makiPoints"
                    v-model.number="scoreForRound.makiPoints"
                    type="number"
                    :mask="twoDigitMask"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                  <v-text-field
                    name="tempuraCards"
                    label="Tempura Cards"
                    id="tempuraCards"
                    v-model.number="scoreForRound.tempuraCards"
                    type="number"
                    :mask="twoDigitMask"                
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                  <v-text-field
                    name="sashimiCards"
                    label="Sashimi Cards"
                    id="sashimiCards"
                    v-model.number="scoreForRound.sashimiCards"
                    type="number"
                    :mask="twoDigitMask">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                  <v-text-field
                    name="dumplingCards"
                    label="Dumpling Cards"
                    id="dumplingCards"
                    v-model.number="scoreForRound.dumplingCards"
                    type="number"
                    :mask="twoDigitMask">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 s6 justify-center>
                    <v-subheader class="no-gap">Salmon Nigiri</v-subheader>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="salmonNigiriNoWasabi"
                    label="No Wasabi"
                    id="salmonNigiriNoWasabi"
                    v-model.number="scoreForRound.nigiriCards.salmonNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="salmonNigiriWithWasabi"
                    label="With Wasabi"
                    id="salmonNigiriWithWasabi"
                    v-model.number="scoreForRound.nigiriCards.salmonWithWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 s6 justify-center>
                    <v-subheader class="no-gap">Egg Nigiri</v-subheader>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="eggNigiriNoWasabi"
                    label="No Wasabi"
                    id="eggNigiriNoWasabi"
                    v-model.number="scoreForRound.nigiriCards.eggNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="eggNigiriWithWasabi"
                    label="With Wasabi"
                    id="eggNigiriWithWasabi"
                    v-model.number="scoreForRound.nigiriCards.eggWithWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 s6 justify-center>
                    <v-subheader class="no-gap">Squid Nigiri</v-subheader>
                </v-flex>

                <v-flex xs6 s3>
                    <v-text-field
                    name="squidNigiriNoWasabi"
                    label="No Wasabi"
                    id="squidNigiriNoWasabi"
                    v-model.number="scoreForRound.nigiriCards.squidNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="squidNigiriWithWasabi"
                    label="With Wasabi"
                    id="squidNigiriWithWasabi"
                    v-model.number="scoreForRound.nigiriCards.squidWithWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>                  
                  <v-text-field
                  name="puddingCards"
                  label="Pudding Cards"
                  id="Pudding Cards"
                  v-model.number="scoreForRound.puddingCards"
                  type="number"
                  :mask="twoDigitMask">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                  <v-btn color="primary" type="submit">Submit</v-btn>
                </v-flex>
          </v-layout> 
        </v-form>
      </v-container>
      </v-layout>
    </v-card-text>
  </v-container>
</template>

<script>
// THIS IS NOT THE DIALOG
import { RoundScore } from '@/store/services/score'

function checkNumber (value) {
  return Number.isInteger(value)
}

export default {
  props: ['userId', 'roundId', 'updateMode'],
  data () {
    return {
      twoDigitMask: '##'
    }
  },
  computed: {
    scoreMode () {
      if (this.updateMode) {
        return true
      }

      return true
    },
    userHasScore () {
      const player = this.player
      if (!player) {
        return false
      }

      const score = this.scoreForRound
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
    handleSubmit: function () {
      console.log('Here I am')
      console.log(this.scoreForRound)
      const localRS = this.scoreForRound
      if (!checkNumber(localRS.makiPoints)) {
        localRS.makiPoints = 0
      }
      if (!checkNumber(localRS.tempuraCards)) {
        localRS.tempuraCards = 0
      }
      if (!checkNumber(localRS.sashimiCards)) {
        localRS.sashimiCards = 0
      }
      if (!checkNumber(localRS.dumplingCards)) {
        localRS.dumplingCards = 0
      }
      if (!checkNumber(localRS.puddingCards)) {
        localRS.puddingCards = 0
      }

      const nc = localRS.nigiriCards
      if (!checkNumber(nc.salmonNoWasabi)) {
        localRS.salmonNoWasabi = 0
      }
      if (!checkNumber(nc.salmonWithWasabi)) {
        localRS.salmonWithWasabi = 0
      }
      if (!checkNumber(nc.eggNoWasabi)) {
        localRS.eggNoWasabi = 0
      }
      if (!checkNumber(nc.eggWithWasabi)) {
        localRS.eggWithWasabi = 0
      }
      if (!checkNumber(nc.squidNoWasabi)) {
        localRS.squidNoWasabi = 0
      }
      if (!checkNumber(nc.squidWithWasabi)) {
        localRS.squidWithWasabi = 0
      }

      localRS.nigiriCards = nc
      localRS.getTotal()
      const payload = {
        id: this.getPlayer().id,
        roundId: this.roundId,
        rs: localRS
      }

      console.log('Sending the payload')
      console.log(payload)

      this.updateMode = false
      this.$store.dispatch('setScoreForRound', payload)
    }
  }
  // ,
  // created () {
  //   const rs = this.getRoundScore()
  //   if (!rs) {
  //     this.roundScore = new RoundScore()
  //   }
  //   this.roundScore = rs.clone()
  // }
}
</script>

<style scoped>
.no-gap {
  padding: 0px;
  margin: 0px;
}
</style>
