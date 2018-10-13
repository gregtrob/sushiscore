<template>

<div>

  <!-- We want a list to show 

      User name - R1 Score & dumplings - R2 Score & dumplines  - R3 Score & dumplings - Final Score
      First is H1
      Second is H2
      Third is H3

      Rest avialable via expansion in order -->

          <v-list>
            <v-list-tile
              v-for="player in winnerList"
              :key="player.id"
              avatar
            >
              <v-list-tile-action>
                <v-icon color="pink">star</v-icon>
              </v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-title v-text="player.name"></v-list-tile-title>
              </v-list-tile-content>
  
              <!-- <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar> -->
            </v-list-tile>
          </v-list>


</div>

</template>
<script>

export default {
  computed: {
    winnerList () {
      return this.$store.getters.getUsers
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
