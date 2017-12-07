<template>

  <v-app light>
  <v-toolbar>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat
                v-for="menuItem in menuItems"
                :key="menuItem.title"
                router :to="menuItem.link">{{ menuItem.title }}
                <v-icon left dark>{{ menuItem.icon }}</v-icon>
            </v-btn>
    </v-toolbar-items>
  </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {
            icon: 'play_circle_outline', title: 'Start Game', link: '/start'
          },
          {
            icon: 'group_add', title: 'Add User', link: '/adduser'
          }

        ]

        return menuItems
      }
    }
  }
</script>

<style lang="css">

</style>
