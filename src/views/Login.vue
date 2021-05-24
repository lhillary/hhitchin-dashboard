<template>
    <v-container fluid >
        <v-row>
            <v-col
                lg="4"
                md="12"
            >
                <v-card height="200px" class="full-height mx-auto pa-4" v-if="!$auth.loading">
                    <v-card-title v-if="!$auth.isAuthenticated">Log In</v-card-title>
                    <v-card-title v-if="$auth.isAuthenticated">Log Out</v-card-title>
                    <v-card-subtitle class="full-height pa-2 d-flex flex-column" v-if="!$auth.isAuthenticated">
                        Please log in to view the information in this dashboard.
                    </v-card-subtitle>
                    <v-card-subtitle class="full-height pa-2 d-flex flex-column" v-if="$auth.isAuthenticated">
                        Please log out of your session when you're done.
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn v-if="!$auth.isAuthenticated" color="primary" @click="login">Log In</v-btn>
                        <v-btn v-if="$auth.isAuthenticated" color="primary" @click="logout">Log Out</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'auth-page',
  methods: {

    login() {
      this.$auth.loginWithRedirect();
    },

    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>