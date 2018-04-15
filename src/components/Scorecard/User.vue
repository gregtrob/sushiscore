<template>
  <v-container fluid>
      <v-layout v-if="inEditMode">
          <v-card-text>
              <v-form >
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
              <v-btn color="primary" @click="submitNameChange">OK</v-btn>
            </v-card-actions>
        </v-layout>
          <v-card-text v-else>
              <div class="headline text-md-center">User {{ theUserName }}
              <v-btn  v-on:click="setEditMode()" x-small><v-icon small>edit</v-icon></v-btn></div>
          </v-card-text>
  </v-container>
</template>

<script>
export default {
  props: ['userId', 'parentEditMode'],
  data () {
    return {
      // Pass Id, Edit mode, If edit mode is "true" then "new"?  Does that make sense?
      // If id is undefined then call a method on the store to create a new user
      newUserName: this.theUserName,
      nameEditMode: this.parentEditMode,
      internalId: this.userId,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  computed: {
    theUserName () {
      if (!this.internalId) {
        return 'Unknown player'
      }

      return this.$store.getters.getUser(this.internalId).name
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
      // if (length(this.newUserName.trim()) === 0) {
      //   return false
      // }

      let payload = {
        id: this.internalId,
        name: this.newUserName
      }
      this.$store.dispatch('changeUserName', payload)
      this.nameEditMode = false
      this.internalId = payload.id
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
