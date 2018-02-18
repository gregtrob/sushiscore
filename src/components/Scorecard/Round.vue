<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs4>
        <h4 class="text-xs-center">Round {{ roundId }} score for {{ userName }}</h4>
      </v-flex>
    </v-layout>

  <template v-if="scoreMode">
    <v-layout row justify-center>
        <v-flex xs4 v-if="userHasScore">
          No score yet
        </v-flex>
        <v-flex xs4 v-else>
          <h3>Round Score: {{ roundScore }}</h3>
          You were {{ makiPlace }} place for maki with {{ makiPoints}}. You had {{ puddingCards}} pudding cards.
        </v-flex>
    </v-layout>
  </template>

  <template v-else>
      <v-form>
        <v-layout row justify-center>
            <v-flex xs2>
              <v-text-field
              name="makiPoints"
              label="Maki Points"
              id="makiPoints"
              v-model="makiPoints"
              box="true"
              :mask="twoDigitMask"
              >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
            <v-flex xs2>
              <v-text-field
              name="tempuraCards"
              label="Tempura Cards"
              id="tempuraCards"
              v-model="tempuraCards"
              box="true"
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
              v-model="sashimiCards"
              box="true">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
            <v-flex xs2>
              <v-text-field
              name="dumplingCards"
              label="Dumpling Cards"
              id="dumplingCards"
              v-model="dumplingCards"
              box="true">
            </v-text-field>
          </v-flex>
        </v-layout>


        <!-- for nigiri  cards it's dropdown & wasabi checkbox with an expectation of one row for each card -->

      <!-- <v-layout row justify-center>
        <v-flex xs2>
        <v-select
          v-bind:items="nigiriTypes"
          v-model="a1"
          label="Select Nigiri Type"
          autocomplete
          class="col-xs-1"
          box="true"
        >
        </v-select>
        <v-checkbox
          label="Wasabi"
          v-model="wasabi"
          class="col-xs-1"
          box="true">

        </v-checkbox>
        </v-flex>

      </v-layout> -->


      <v-layout row justify-center>
        <v-flex xs2>
            <v-list class="no-gap"> 
              <v-subheader class="no-gap">Salmon Nigiri</v-subheader>
              <v-text-field
              name="salmonNigiriNoWasabi"
              label="No Wasabi"
              id="salmonNigiriNoWasabi"
              v-model="nigiriCards.salmonNoWasabi"
              box="true">
              </v-text-field>
              <v-text-field
              name="salmonNigiriWithWasabi"
              label="With Wasabi"
              id="salmonNigiriWithWasabi"
              v-model="nigiriCards.salmonWithWasabi"
              box="true">
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
              v-model="nigiriCards.eggNoWasabi"
              box="true">
              </v-text-field>
              <v-text-field
              name="eggNigiriWithWasabi"
              label="With Wasabi"
              id="eggNigiriWithWasabi"
              v-model="nigiriCards.eggWithWasabi"
              box="true">
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
              v-model="nigiriCards.squidNoWasabi"
              box="true">
              </v-text-field>
              <v-text-field
              name="squidNigiriWithWasabi"
              label="With Wasabi"
              id="squidNigiriWithWasabi"
              v-model="nigiriCards.squidWithWasabi"
              box="true">
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
              v-model="puddingCards"
              box="true">
            </v-text-field>
          </v-flex>
        </v-layout>

      <v-layout row justify-center>
        <v-flex xs2>
          <v-btn>Submit</v-btn>
        </v-flex>
      </v-layout>

      </v-form>
  </template>
  

</v-container>

</template>

<script>
export default {
  props: ['userId', 'roundId', 'userName'],
  data () {
    return {
      makiPoints: 0,
      tempuraCards: 0,
      sashimiCards: 0,
      dumplingCards: 0,
      nigiriCards: {
        // this may have to become it's own entry system with a check for wasabi on each?
        salmonNoWasabi: 0,
        salmonWithWasabi: 0,
        eggNoWasabi: 0,
        eggWithWasabi: 0,
        squidNoWasabi: 0,
        squidWithWasabi: 0
      },
      puddingCards: 0,
      editMode: true,
      twoDigitMask: '##',
      scoreMode: true,
      userScore: null
    }
  },
  computed: {
    userHasScore () {
      return this.userScore === null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
 .no-gap {
   padding: 0px;
   margin: 0px;
 }

</style>
