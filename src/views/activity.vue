<template>
  <v-app>
    <v-card class="blue--text">
      <v-card-title>Activity</v-card-title>
      <v-card-text v-for="(item,itemIndex) in taskRecords" :key="itemIndex">
        <h3 class="font-weight-bold">{{item.startDate}}</h3>
        <v-divider></v-divider>
        <p class="font-weight-regular blue--text"><b>Task - </b>{{item.name}}</p>
        <p class="blue--text"><b>Assingee - </b>
          <v-avatar color="orange darken-2" class="white--text" size="22">{{item.avatar}}</v-avatar> {{item.empName|capitalize}}
        </p>
         <p class="font-weight-regular red--text"><b>Spend time </b>{{item.spendTime}}
          <v-icon small class="mr-2">mdi-clock</v-icon>Hours
        </p>
        <p><b>Updated on - </b> {{item.updatedOn}}</p>
      </v-card-text>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      taskRecords: []
    }
  },
  methods: {
    async  fetchtaskDetails () {
      const taskDetails = await this.fetchDetails(this.url)
      const Moment = require('moment')
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.taskRecords = taskDetails.sort((b, a) => new Moment(a.startDate, 'DD/MM/YYYY').format('YYYYMMDD') - new Moment(b.startDate, 'DD/MM/YYYY').format('YYYYMMDD'))
        this.taskRecords.forEach((task) => {
          const employee = employeeDetails.find(employee => employee.id === task.employeeId)
          if (employee) {
            task.lastName = employee.lastName.charAt(0).toUpperCase()
            task.namefirstLetter = employee.name.charAt(0).toUpperCase()
            task.avatar = task.namefirstLetter + task.lastName
            task.empName = employee.name
          }
        })
      })
    }
  },
  mounted () {
    this.fetchtaskDetails()
  }
}
</script>
