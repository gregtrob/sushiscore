// This displays as a dialog when the user clicks 
// "Start game" or "Add user". It has an "OK" 
// "Cancel" and "Add another" buttons
// OK of course saves it and ensures it's displayed 
// on the user list
// Add another does "OK" but continues to display the dialog
// Cancel does nothing else and hides the dialog again
// expected events "AddNewUser" (for store which triggers a "refresh list")
<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs4>
        <div class="text-xs-center v-align-center" v-if="inEditMode">
          <v-form>
           <v-text-field label="User name"
                          v-model="newUserName"
                          required>
           </v-text-field>
           <v-btn @click="submitNameChange">OK</v-btn>
          </v-form>
          <!-- <span class="display-1">In edit mode - User {{ theUserName }} - {{ userId }}</span> -->
          <v-btn  v-on:click="setEditMode()"><v-icon style="vertical-align:middle">edit</v-icon></v-btn>
        </div>
        <div class="text-xs-center v-align-center" v-else>
          <span class="display-1">User {{ theUserName }} - User Id {{ userId }}</span>
          <v-btn  v-on:click="setEditMode()"><v-icon style="vertical-align:middle">edit</v-icon></v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  props: ['userId'],
  data () {
    return {
      // Pass Id, Edit mode, If edit mode is "true" then "new"?  Does that make sense?
      // If id is undefined then call a method on the store to create a new user
      nameEditMode: false,
      newUserName: this.theUserName
    }
  },
  computed: {
    theUserName () {
      if (this.userId === undefined) {
        return 'Default name'
      }

      return this.$store.getters.getUser(this.userId).name
    },
    inEditMode () {
      return this.nameEditMode
    }

  },
  methods: {
    setEditMode () {
      this.newUserName = this.theUserName
      this.nameEditMode = !this.nameEditMode
    },
    submitNameChange () {
      console.log('name change' + this.newUserName)
      // TODO: Submit this to the main thing
      let payload = {
        id: this.userId.toString(),
        name: this.newUserName
      }
      this.$store.dispatch('changeUserName', payload)
      this.nameEditMode = false
      console.log(this.$store.getters.getUsers)
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
