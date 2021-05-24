<template>
  <v-app>
    <v-app-bar app color="#000" dark elevation="0">
        <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn text link href="https://humphreyhillaryhitchin.com">
          Back to Site
          <v-icon right>mdi-open-in-new</v-icon>
        </v-btn>
        
    </v-app-bar>
    <v-navigation-drawer 
        v-model="sidebarMenu" 
        app
        floating
        :permanent="sidebarMenu"
        :mini-variant.sync="mini"
    >
      <v-list dense color="#000" dark>
          <v-list-item>
            <v-list-item-action>
                <v-icon @click.stop="sidebarMenu = !sidebarMenu">mdi-chevron-left</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    <h3 class="font-weight-bold">L&D Dashboard</h3>
                </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="toggleMini = !toggleMini">
          <v-list-item-avatar>
              <v-icon>mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-truncate">
              Admin
          </v-list-item-content>
          <v-icon>mdi-chevron-left</v-icon>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
            <v-list-item-icon>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!$auth.loading" link to="/">
            <v-list-item-icon>
              <v-icon color="primary">mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="!$auth.isAuthenticated">
              <v-list-item-title class="primary--text">Log In</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="$auth.isAuthenticated">
              <v-list-item-title class="primary--text">Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
      <v-main>
          <v-container class="px-4 py-0 fill-height" fluid>
              <v-row class="fill-height">
                  <v-col>
                      <transition name="fade">
                          <router-view></router-view>
                      </transition>
                  </v-col>
              </v-row>
          </v-container>
      </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
      sidebarMenu: true,
      toggleMini: false,
      items: [
        { title:"Dashboard", href:"/dashboard", icon:"mdi-home-outline" },
        { title:"Messages", href:"/messages", icon:"mdi-message-text" },
        { title:"Guest Table", href:"/table", icon:"mdi-table" }
      ],
  }),
  computed: {
    mini() {
        return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    }
  }
};
</script>

<style scoped lang="scss">

  h3 {
    text-transform: uppercase;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>
