<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-1 space">
              <v-toolbar  color="success">
                <v-toolbar-title class="space">Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field  label="username" v-model="login.username"  type="text"></v-text-field>
                  <v-text-field  label="Password"  v-model="login.password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn color="success"  @click="verifyLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import action from '../mixins/action'
export default {
  data () {
    return {
      login: {},
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      employeeRecords: []
    }
  },
  methods: {
    fetchEmployeeDetails () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.employeeRecords = employeeDetails
      })
    },
    verifyLogin () {
      const employee = this.employeeRecords.find(employee => employee.username === this.login.username && employee.password === this.login.password)
      if (employee) {
        this.$cookies.set('employee', JSON.stringify(employee))
        this.$store.commit('curUserDetais', employee)
        this.$router.push('/home')
      } else {
        this.$root.$emit('snackBar', { text: 'username or password incorrect', color: 'error', snackBar: true })
      }
    }
  },
  mixins: [action],
  mounted () {
    this.fetchEmployeeDetails()
  }
}
</script>
<style scoped>
.space{
    color:white;
    margin-top: 50;
}
</style>
