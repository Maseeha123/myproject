<template>
  <div>
    <v-col class="text-right">
      <v-btn color="primary" @click="editUserDetails">Edit Profile</v-btn>
    </v-col>
    <v-card class="user-profile">
      <v-card color="primary" class="white--text text-uppercase">
        <v-row color="primary">
          <v-col cols="8" class="ml-6">user Profile
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col cols="12" class="mt-5 ml-6">
          <p> <b>Name</b> {{user.name | capitalize}}</p>
          <p> <b>Designation</b> {{user.jobTitle | capitalize}}</p>
        </v-col>
      </v-row>
      <v-card color="grey lighten-1" class="white--text">
        <v-row color="primary" class="text-uppercase">
          <v-col cols="8" class="ml-6">Personal Information
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row>
          <v-col cols="12" style="margin-left:30px">
            <p><b>Name</b> {{user.name | capitalize}}</p>
            <p><b>Last Name </b>{{user.lastName | capitalize}}</p>
            <p><b>Email </b>{{user.email}}</p>
            <p><b>Address </b>{{user.address | capitalize}}</p>
            <p><b>Mobile </b>{{user.mobile}}</p>
            <p><b> Designation </b> {{user.jobTitle|capitalize}}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import action from '../mixins/action'
export default {
  data () {
    return {
      active: 'value',
      url: 'https://traineesapi.firebaseio.com/employee',
      user: {}
    }
  },
  methods: {
    async getUserDetails () {
      this.editDetails(this.url, this.$store.state.userDetails.id).then((fetchRecord) => {
        this.user = fetchRecord.data
      })
    },
    editUserDetails () {
      this.$router.push(`/viewProfile/${this.$store.state.userDetails.id}`)
    }
  },
  mixins: [action],
  mounted () {
    this.getUserDetails()
  }
}
</script>
<style scoped>
.user-profile{
  margin-top: 20px;
}
.edit-profile{
  margin-left: 900px;
}
</style>
