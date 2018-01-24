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
          <span class="display-1">User {{ theUserName }} - {{ userId }}</span>
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
      this.$forceUpdate()
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
