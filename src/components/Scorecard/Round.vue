<template>
<!-- Wrap all this in a card -->
    <v-container
      fluid
    >

    <v-card>
  
    <v-card-title primary-title>
      <v-layout row justify-center>
          <h4 class="text-md-center">Round {{ roundId }} score</h4>
      </v-layout>
    </v-card-title>

  <template v-if="scoreMode">
    <v-layout row justify-center>
      <v-card-text>
        <div v-if="userHasScore">
          <div class="text-md-center">Your score for the round was {{ roundScore.getTotal() }}.  You had {{ roundScore.makiPoints }} maki points.  You had {{ roundScore.puddingCards }} pudding cards.</div>          
        </div>
        <div v-else>
          No score yet
        </div>
      </v-card-text>
    </v-layout>
  </template>

  <template v-else>

            <v-card>
            <v-card-text>
                <v-layout row wrap >
                    <v-container xs3 fluid>
                           <v-form ref="form">
                                <v-layout row wrap>
                                    <v-flex xs3 v-for="option in selectOptions" :key="option.text">
                                         <v-text-field :label="option.text" :value="option.value"></v-text-field>
                                    </v-flex> 
                                    <v-flex xs3>
                                         <v-btn small dark class="primary">save</v-btn>
                                    </v-flex>             
                                </v-layout>                    
                        </v-form>
                    </v-container>
                </v-layout>
                </v-card-text>
                </v-card>

      <v-card-text>
        <v-form>
          <v-layout row wrap justify-center>
              <v-flex xs3>
                <v-text-field
                name="makiPoints"
                label="Maki Points"
                id="makiPoints"
                v-model="roundScore.makiPoints"
                :mask="twoDigitMask"
                >
              </v-text-field>
              <v-text-field
                name="tempuraCards"
                label="Tempura Cards"
                id="tempuraCards"
                v-model="roundScore.tempuraCards"
                :mask="twoDigitMask"                
                >
              </v-text-field>
            </v-flex>
          </v-layout>


          <v-layout row justify-center>
              <v-flex xs2>
                <v-text-field
                name="sashimiCards"
                label="Sashimi Cards"
                id="sashimiCards"
                v-model="roundScore.sashimiCards"
                :mask="twoDigitMask">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
              <v-flex xs2>
                <v-text-field
                name="dumplingCards"
                label="Dumpling Cards"
                id="dumplingCards"
                v-model="roundScore.dumplingCards"
                :mask="twoDigitMask">
              </v-text-field>
            </v-flex>
          </v-layout>

        <v-layout row justify-center>
          <v-flex xs2>
              <v-list class="no-gap"> 
                <v-subheader class="no-gap">Salmon Nigiri</v-subheader>
                <v-text-field
                name="salmonNigiriNoWasabi"
                label="No Wasabi"
                id="salmonNigiriNoWasabi"
                v-model="roundScore.nigiriCards.salmonNoWasabi"
                :mask="twoDigitMask">
                </v-text-field>
                <v-text-field
                name="salmonNigiriWithWasabi"
                label="With Wasabi"
                id="salmonNigiriWithWasabi"
                v-model="roundScore.nigiriCards.salmonWithWasabi"
                :mask="twoDigitMask">
                </v-text-field>
              </v-list>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs2>
              <v-list class="no-gap"> 
                <v-subheader class="no-gap">Egg Nigiri</v-subheader>
                <v-text-field
                name="eggNigiriNoWasabi"
                label="No Wasabi"
                id="eggNigiriNoWasabi"
                v-model="roundScore.nigiriCards.eggNoWasabi"
                :mask="twoDigitMask">
                </v-text-field>
                <v-text-field
                name="eggNigiriWithWasabi"
                label="With Wasabi"
                id="eggNigiriWithWasabi"
                v-model="roundScore.nigiriCards.eggWithWasabi"
                :mask="twoDigitMask">
                </v-text-field>
              </v-list>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs2>
              <v-list class="no-gap"> 
                <v-subheader class="no-gap">Squid Nigiri</v-subheader>
                <v-text-field
                name="squidNigiriNoWasabi"
                label="No Wasabi"
                id="squidNigiriNoWasabi"
                v-model="roundScore.nigiriCards.squidNoWasabi"
                :mask="twoDigitMask">
                </v-text-field>
                <v-text-field
                name="squidNigiriWithWasabi"
                label="With Wasabi"
                id="squidNigiriWithWasabi"
                v-model="roundScore.nigiriCards.squidWithWasabi"
                :mask="twoDigitMask">
                </v-text-field>
              </v-list>
          </v-flex>
        </v-layout> 

          <v-layout row justify-center>
              <v-flex xs2>
                <v-text-field
                name="puddingCards"
                label="Pudding Cards"
                id="Pudding Cards"
                v-model="roundScore.puddingCards"
                :mask="twoDigitMask">
              </v-text-field>
            </v-flex>
          </v-layout>

        <v-layout row justify-center>
          <v-flex xs2>
            <v-btn>Submit</v-btn>
          </v-flex>
        </v-layout>

        </v-form>
      </v-card-text>
  </template>
  
    </v-card>
</v-container>

</template>

<script>
import { Player, RoundScore } from '@/store/services/score'

export default {
  props: ['userId', 'roundId', 'updateMode'],
  data () {
    return {
      editMode: true,
      twoDigitMask: '##',
      thePlayer: null,
      roundScore: null,
      selectOptions: [
        {text: 'Apples', value: 'apple'},
        {text: 'Oranges', value: 'orange'},
        {text: 'Grapes', value: 'grape'},
        {text: 'Banana', value: 'banana'},
        {text: 'Strawberry', value: 'strawberry'},
        {text: 'Kiwi', value: 'kiwi'},
        {text: 'Lime', value: 'lime'},
        {text: 'Lemon', value: 'lemon'},
        {text: 'Cucumber', value: 'Cucumber'},
        {text: 'Tomato', value: 'Tomato'},
        {text: 'Durian', value: 'durian'},
        {text: 'Blueberry', value: 'blueberry'},
        {text: 'Cherry', value: 'cherry'},
        {text: 'Blackberry', value: 'blackberry'}

      ],
      theUserId: this.userId
    }
  },
  computed: {
    scoreMode () {
      if (this.updateMode) {
        return true
      }

      // return true
      return false
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
