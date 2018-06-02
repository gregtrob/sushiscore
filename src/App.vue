<template>

  <v-app light>
  <!-- <v-toolbar>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat
                v-for="menuItem in menuItems"
                :key="menuItem.title"
                router :to="menuItem.link">{{ menuItem.title }}
                <v-icon left dark>{{ menuItem.icon }}</v-icon>
            </v-btn> 
            <v-btn flat>Add user<v-icon left dark v-on:click="changeIt">group_add</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
 -->
    
    <main>
      <router-view></router-view>
      <!-- <add-user v-bind:addUser='addUserDialog'></add-user> -->
    </main>
  </v-app>
</template>

<script>
// import UserDialog from './components/Scorecard/UserDialog.vue'

export default {
  // components: {
  //   'add-user': UserDialog
  // },
  // data () {
  //   return {
  //     sideNav: false,
  //     addUserDialog: false
  //   }
  // },
  // created () {
  //   this.$on('closeAddUser', function () {
  //     this.addUserDialog = false
  //   })
  // },
  // computed: {
  //   menuItems () {
  //     // TODO: Use Events to trigger the dialogs for add & update
  //     let menuItems = [
  //       {
  //         icon: 'play_circle_outline', title: 'Start Game', link: '/start'
  //       },
  //       {
  //         icon: 'group_add', title: 'Add User', link: '/adduser'
  //       },
  //       {
  //         icon: 'update', title: 'Score round', link: '/scoreround'
  //       }
  //     ]

  //     return menuItems
  //   }
  // },
  // methods: {
  //   changeIt () {
  //     console.log('Here')
  //     this.addUserDialog = !this.addUserDialog
  //   }
  // }
}
</script>

<style lang="css">

</style>
