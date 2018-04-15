<template>
    <v-dialog persistent max-width="290" value="true">
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
  data () {
    return {
      // Pass Id, Edit mode, If edit mode is "true" then "new"?  Does that make sense?
      // If id is undefined then call a method on the store to create a new user
      newUserName: this.theUserName,
      rules: {
        required: (value) => !!value || 'Required.'
      }

    }
  },
  methods: {
    submitNameChange () {
      let payload = {
        id: null,
        name: this.newUserName
      }
      this.$store.dispatch('changeUserName', payload)
    },
    addAnother () {
      console.log(1)
      this.submitNameChange()
      console.log(2)
      this.newUserName = ''
      console.log(3)
      // this.$router.push('/AddUser')
      this.$refs.newnameform.reset()
      // post an event here to say "redraw the users in play mofo"
    },
    startPlay () {
      this.submitNameChange()
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
