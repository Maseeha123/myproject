<template>
  <v-app>
    <v-card class="mt-12">
      <v-card-title>MEMBERS</v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                NAME
              </th>
              <th class="text-left">
                EMAIL
              </th>
                <th class="text-left">
                GROUP
              </th>
                <th class="text-left">
                ROLE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in employeeRecords" :key="item.name">
              <td><v-avatar color="purple lighten-2" class="white--text" size="25">{{item.avatar}}</v-avatar> {{ item.name |capitalize }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.group }}</td>
              <td>{{ item.role}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      isloading: true,
      employeeRecords: []
    }
  },
  methods: {
    fetchEmployeeDetails () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.employeeRecords = employeeDetails
        this.employeeRecords.forEach((employee) => {
          employee.role = employee.role.join(',')
          employee.last = employee.lastName.charAt(0).toUpperCase()
          employee.namefirstLetter = employee.name.charAt(0).toUpperCase()
          employee.avatar = employee.namefirstLetter + employee.last
        })
      })
    }
  },
  mounted () {
    this.fetchEmployeeDetails()
  }
}
</script>
<style scoped>
.textColor{
  color:white
}
</style>
