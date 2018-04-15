<template>

<v-layout row justify-center>
    <v-card v-for="player in playerList" :key="player.id">
      <player-round userId=player.id></player-round>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="290" v-if="isGameActive">
      <v-card>
        <v-card-title class="headline">Continue existing game?</v-card-title>
        <v-card-text>It appears a game is in progress.  Would you like to continue it or start a new game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="continueGame">Continue</v-btn>
          <v-btn color="green darken-1" flat @click.native="startNewGame">New</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="290" v-else>
      <v-card>
        <v-card-title class="headline">Start a new game</v-card-title>
        <v-card-text>There's nothing here.  Would you like to start a game?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="startNewGame">Yes</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      dialog: true
    }
  },
  computed: {
    isGameActive () {
      return !this.$store.getters.isGameActive
    },
    playerList () {
      const players = this.$store.getters.getUsers
      console.log(players)
      return players
    }
  },
  methods: {
    startNewGame () {
      this.dialog = false
      this.$router.push('NewGame')
    },
    continueGame () {
      console.log('here')
      this.dialog = false
      this.$router.push('/playerround')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
