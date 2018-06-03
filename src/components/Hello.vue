<template>

<v-layout justify-center>

    <v-container fluid grid-list-sm>
      <v-layout row wrap justify-center>
        <v-flex xs4 v-for="player in playerList" :key="player.id">
          <v-card id="player.id">
            <player-round :userId='player.id'></player-round>
          </v-card>      
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn
      fab
      small
      color="cyan accent-2"
      bottom
      right
      fixed
      @click.native.stop="addUser = !addUser"
    >
      <v-icon>group_add</v-icon>
    </v-btn>

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

    <add-user v-bind:addUser='addUser'></add-user>

  </v-layout>
</template>

<script>
import UserDialog from './User/UserDialog.vue'
import PlayerRound from './Game/PlayerRound.vue'

export default {
  name: 'hello',
  components: {
    'add-user': UserDialog,
    'player-round': PlayerRound
  },
  data () {
    return {
      dialog: true,
      addUser: false,
      newUserName: this.theUserName,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  created () {
    this.$on('closeAddUser', function () {
      this.addUser = false
    })
  },
  computed: {
    isGameActive () {
      return this.$store.getters.isGameActive
    },
    playerList () {
      const players = this.$store.getters.getUsers
      return players
    }
  },
  methods: {
    startNewGame () {
      this.dialog = false
      // this.$router.push('/adduser')
      this.addUser = true
    },
    continueGame () {
      this.dialog = false
      this.$router.push('/playerround')
    }
    // submitNameChange () {
    //   if (!this.$refs.newnameform.validate()) {
    //     return false // failed validation
    //   }

    //   let payload = {
    //     id: null,
    //     name: this.newUserName
    //   }
    //   this.$store.dispatch('changeUserName', payload)
    //   return true
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
