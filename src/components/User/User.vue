<template>
  <v-card tile>
    <v-layout row justify-center>

      <v-card-text v-if="inEditMode">
          <v-form >
            <v-text-field label="User name"
                            v-model="newUserName"
                            style="display: inline-block"
                            class="text-md-center"
                            required
                            :rules="[rules.required]">
            </v-text-field>

          <!-- <v-card-actions> -->
            <v-icon @click="submitNameChange" small color="cyan darken-2">done</v-icon>
          <!-- </v-card-actions> -->

          </v-form>

        </v-card-text>
      <v-card-title primary-title v-else>
              <span class="text-md-center">
                {{ theUserName }} 
                <v-icon v-on:click="setEditMode()" color="cyan darken-2" small>edit</v-icon>
              </span>
      </v-card-title>
    </v-layout>

  </v-card>
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
