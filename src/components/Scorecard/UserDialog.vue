<template>
  <v-dialog persistent max-width="290" v-model="showDialog">
    <v-card>
      <v-card-title class="headline">Add user</v-card-title>
        <v-card-text>
            <v-form ref="newnameform">
              <v-text-field label="User name"
                              v-model="newUserName"
                              style="display: inline-block"
                              class="text-md-center"
                              required
                              :rules="[rules.required]">
              </v-text-field>
            </v-form>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="addAnother">Add another</v-btn>
        <v-btn color="green darken-1" flat @click.native="startPlay">Start play</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'userdialog',
  props: ['addUser'],
  data () {
    return {
      newUserName: this.theUserName,
      showDialog: this.addUser,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  methods: {
    submitNameChange () {
      if (!this.$refs.newnameform.validate()) {
        return false // failed validation
      }

      let payload = {
        id: null,
        name: this.newUserName
      }
      this.$store.dispatch('changeUserName', payload)
      return true
    },
    addAnother () {
      if (this.submitNameChange()) {
        this.$refs.newnameform.reset()
      }
    },
    startPlay () {
      // if the background is updated via events and is in fact the "play" board
      // all this needs to do is then close the dialog after adding
      this.submitNameChange()
      this.showDialog = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
