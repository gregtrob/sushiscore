<template>

<div>

  <!-- We want a list to show 

      User name - R1 Score & dumplings - R2 Score & dumplines  - R3 Score & dumplings - Final Score
      First is H1
      Second is H2
      Third is H3

      Rest avialable via expansion in order -->

      <v-data-table
        :headers="headers"
        :items="players"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="thePlayer">
          <tr>
          <td>{{ thePlayer.item.place }}</td>
          <td >{{ thePlayer.item.name }}</td>
          <td >{{ thePlayer.item.gameScore.r1Score }}</td>
          <td >{{ thePlayer.item.gameScore.r2Score }}</td>
          <td >{{ thePlayer.item.gameScore.r3Score }}</td>                    
          <td >{{ thePlayer.item.gameScore.puddingScore }}</td>
          </tr>
        </template>
      </v-data-table>


  <!-- <v-list>
      <span       
        v-for="player in players"
        :key="player.id">
        <winner-details 
        v-bind:player="player" 
        :icon="firstPlace"></winner-details>

      </span>


  </v-list>  -->


</div>

</template>
<script>
export default {
  data () {
    return {
      headers: [
        // {
        //   text: 'Players',
        //   align: 'left',
        //   sortable: false,
        //   value: 'name'
        // },
        { text: 'Place', value: 'place' },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Round 1 Score', value: 'rs1', sortable: false },
        { text: 'Round 2 Score', value: 'rs2', sortable: false },
        { text: 'Round 3 Score', value: 'rs3', sortable: false },
        { text: 'Pudding Score', value: 'Pudding Score', sortable: false }
      ]
    }
  },
  computed: {
    players () {
      const winnerMap = this.$store.getters.getWinnerList

      // TODO: Undrstand why this works but push.map does not
      let list = this.addPlace(winnerMap.first, '1st')
      let list2 = this.addPlace(winnerMap.second, '2nd')
      list = list.concat(list2)
      list2 = this.addPlace(winnerMap.third, '3rd')
      list = list.concat(list2)
      list2 = this.addPlace(winnerMap.participantTrophy, 'L')
      list = list.concat(list2)

      return list
    },
    winnerList () {
      return this.$store.getters.getWinnerList
    },
    first () {
      return this.winnerList.first
    },
    second () {
      return this.winnerList.second
    },
    third () {
      return this.winnerList.third
    },
    other () {
      return this.winnerList.participantTrophy
    }
  },
  methods: {
    addPlace (inboundList, placeName) {
      inboundList.forEach(element => {
        Object.defineProperty(element, 'place',
          {value: placeName,
            writable: true,
            enumerable: true,
            configurable: true})
      })

      return inboundList
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
