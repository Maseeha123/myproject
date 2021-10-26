<template>
  <v-app>
      <v-navigation-drawer app permanat v-model="drawer" v-if="!$route.meta.hideNavbar">
   <v-list-item>
     <v-list-item-content>
       <v-list-item-title  class="text-h6 text-capitalize">
         Project Management
       </v-list-item-title>
     </v-list-item-content>
   </v-list-item>
   <v-divider></v-divider>
  <v-list dense nav thee-line>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
     <v-list-item v-for="item in hideList" :key="item.title" link>
       <v-list-item-icon>
         <v-icon :color="item.color" @click="$router.push(item.path)">{{ item.icon }}</v-icon>
       </v-list-item-icon>
    <v-list-item-content class="py-0">
        <v-list-item-title  class="py-2" @click="$router.push(item.path)" link>{{ item.title }}</v-list-item-title>
       </v-list-item-content>
     </v-list-item>
      </v-list-item-group>
   </v-list>
 </v-navigation-drawer>
    <v-app-bar app color="success" dark v-if="!$route.meta.hideNavbar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-row justify="end">
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown lighten-1" right size="38">
                <span class="white--text text-h5">{{ userDetails.lastName }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text text-h5">{{ userDetails.lastName | capitalize }}</span>
                </v-avatar>
                <h3>{{ userDetails.name }}</h3>
                <p class="text-caption mt-1">
                  {{ userDetails.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="logout()">
                  Logout
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar>
    <v-main>
    <v-container fluid>
      <router-view />
     <v-snackbar top  outline  absolute v-model="alert.snackBar" :color="alert.color">
      {{ alert.text}}
   <template v-slot:action="{ attrs }">
     <v-btn color="#FFFFFF" text v-bind="attrs" @click="alert.snackBar = false">
       Close
     </v-btn>
   </template>
 </v-snackbar>
      </v-container>
    </v-main>
    <v-footer color="#B0BEC5" padless v-if="!$route.meta.hideNavbar">
      <v-row justify="center" no-gutters>
        <v-col class="lighten-2 py-4 text-center white--text" cols="12">
          <strong>task Mangement </strong>&copy;
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import VueCookies from 'vue-cookies'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    drawer: true,
    group: null,
    user: {},
    details: VueCookies.get('employee'),
    right: null,
    alert: {}
  }),
  computed: {
    ...mapGetters(['userDetails', 'hideList'])
  },
  methods: {
    navigation () {
      this.drawer = true
    },
    curUserDetais () {
      if (this.details) this.$store.commit('curUserDetais', this.details)
    },
    logout () {
      VueCookies.remove('employee')
      this.$router.push('/')
    },
    snackBar () {
      this.$root.$on('snackBar', (data) => {
        this.alert = data
      })
    }
  },
  mounted () {
    this.curUserDetais()
    this.snackBar()
  }
}
</script>
<style scoped>
</style>
