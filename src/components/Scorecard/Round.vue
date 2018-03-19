<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
      </v-layout>
    </v-card-title>
    <v-card-text v-if="scoreMode" justify-center>
      <div v-if="userHasScore">
        <div class="text-md-center">Your score for the round was {{ roundScore.getTotal() }}.  You had {{ roundScore.makiPoints }} maki points.  You had {{ roundScore.puddingCards }} pudding cards.</div>          
      </div>
      <div v-else>
        No score yet
      </div>
    </v-card-text>
    <v-card-text else>
        <v-layout row wrap>
          <v-container xs3 fluid>
            <v-form @submit.prevent="handleSubmit">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    name="makiPoints"
                    label="Maki Points"
                    id="makiPoints"
                    v-model.number="roundScore.makiPoints"
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
                    v-model.number="roundScore.tempuraCards"
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
                    v-model.number="roundScore.sashimiCards"
                    type="number"
                    :mask="twoDigitMask">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                  <v-text-field
                    name="dumplingCards"
                    label="Dumpling Cards"
                    id="dumplingCards"
                    v-model.number="roundScore.dumplingCards"
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
                    v-model.number="roundScore.nigiriCards.salmonNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="salmonNigiriWithWasabi"
                    label="With Wasabi"
                    id="salmonNigiriWithWasabi"
                    v-model.number="roundScore.nigiriCards.salmonWithWasabi"
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
                    v-model.number="roundScore.nigiriCards.eggNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="eggNigiriWithWasabi"
                    label="With Wasabi"
                    id="eggNigiriWithWasabi"
                    v-model.number="roundScore.nigiriCards.eggWithWasabi"
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
                    v-model.number="roundScore.nigiriCards.squidNoWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>
                    <v-text-field
                    name="squidNigiriWithWasabi"
                    label="With Wasabi"
                    id="squidNigiriWithWasabi"
                    v-model.number="roundScore.nigiriCards.squidWithWasabi"
                    type="number"
                    :mask="twoDigitMask">
                    </v-text-field>
                </v-flex>
                <v-flex xs6 s3>                  
                  <v-text-field
                  name="puddingCards"
                  label="Pudding Cards"
                  id="Pudding Cards"
                  v-model.number="roundScore.puddingCards"
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
  </v-card>
</template>

<script>
import { Player, RoundScore } from '@/store/services/score'

function checkNumber (value) {
  return Number.isInteger(value)
}

export default {
  props: ['userId', 'roundId', 'updateMode'],
  data () {
    return {
      editMode: true,
      twoDigitMask: '##',
      thePlayer: null,
      roundScore: null,
      // selectOptions: [
      //   {text: 'Apples', value: 'apple'},
      //   {text: 'Oranges', value: 'orange'},
      //   {text: 'Grapes', value: 'grape'},
      //   {text: 'Banana', value: 'banana'},
      //   {text: 'Strawberry', value: 'strawberry'},
      //   {text: 'Kiwi', value: 'kiwi'},
      //   {text: 'Lime', value: 'lime'},
      //   {text: 'Lemon', value: 'lemon'},
      //   {text: 'Cucumber', value: 'Cucumber'},
      //   {text: 'Tomato', value: 'Tomato'},
      //   {text: 'Durian', value: 'durian'},
      //   {text: 'Blueberry', value: 'blueberry'},
      //   {text: 'Cherry', value: 'cherry'},
      //   {text: 'Blackberry', value: 'blackberry'}

      // ],
      theUserId: this.userId
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
    // ,
    // makiPoints: {
    //   get () {
    //     return this.roundScore.makiPoints
    //   },
    //   set (v) {
    //     // console.log('setting value')
    //     this.roundScore.makiPoints = v
    //     // console.log('value set')
    //   }
    // }
  },
  methods: {
    getPlayer: function () {
      if (this.thePlayer) {
        // console.log('Found right away')
        return this.thePlayer
      }
      let player = this.$store.getters.getUser(this.theUserId)
      if (!player) {
        player = new Player()
        player.rs1 = new RoundScore()
        player.rs1.makiPoints = 5
        player.rs1.puddingCards = 1
        player.rs1.sashimiCards = 10
      }
      this.thePlayer = player
      // console.log(this.thePlayer)
      return this.thePlayer
      // return this.$store.getters.getUser(this.userId)
    },
    getRoundScore: function () {
      console.log(this.getPlayer())
      let rs = this.getPlayer().getRoundScore(this.roundId)
      console.log(rs)
      if (!rs) {
        console.log('RS did not already exist')
        rs = new RoundScore()
      }
      console.log('Getting fs')
      console.log(rs)
      return rs
    },
    handleSubmit: function () {
      console.log('Here I am')
      console.log(this.roundScore)
      const localRS = this.roundScore
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
      // TODO: Dispath and set
      const payload = {
        id: this.getPlayer().id,
        roundId: this.roundId,
        rs: localRS
      }

      this.updateMode = false
      this.$store.dispatch('setScoreForRound', payload)
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
