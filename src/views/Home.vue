<template>
<div>
  <v-row>
     <v-col  v-for="(item,itemIndex) in  items" :key="itemIndex" :cols="item.cols">
      <v-card class="mx-auto space" max-width="400">
        <v-card  max-width="80" :color="item.color" height="60" class="ml-4  v-sheet--offset">
         <v-icon class="textAlignment">{{item.icon}}</v-icon>
        </v-card>
          <router-link class="textColor" :to="item.path">
          <v-card-title>{{item.title}}</v-card-title>
        <v-card-text class="text--primary">
          <div class="textColor">{{item.text}}</div>
        </v-card-text>
          </router-link>
      </v-card>
    </v-col>
  </v-row>
<v-row>
  <v-col cols="12">
<highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </v-col>
</v-row>
</div>
</template>
<script>
import action from '../mixins/action'
import { Chart } from 'highcharts-vue'
export default
{
  data () {
    return {
      projectURL: 'https://traineesapi.firebaseio.com/project',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      hoursURL: 'https://traineesapi.firebaseio.com/hours',
      totalProjects: 0,
      totalUsers: 0,
      totalHours: 0,
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Total Projects and Spend Hours'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Spend Hours'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
            }
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total Hours<br/>'
        },
        series: [
          {
            colorByPoint: true,
            data: [
            ]
          }
        ]
      }
    }
  },
  methods:
   {
     async getProjectRecords () {
       const projectDetails = await this.fetchDetails(this.projectURL)
       this.totalProjects = Object.keys(projectDetails).length
       this.fetchDetails(this.hoursURL).then((hoursDetails) => {
         hoursDetails.forEach((totalHour) => {
           this.totalHours += totalHour.hour
         })
         projectDetails.forEach((project) => {
           const record = { newHour: 0, getprojectName: '', hourProject: {}, chart: [] }
           record.chart = hoursDetails.filter(projectHours => projectHours.projectId === project.id)
           if (record.chart.length) {
             record.chart.forEach((totalHours) => {
               record.newHour += totalHours.hour
               record.hourProject.y = record.newHour
               record.getprojectName = projectDetails.find(getName => getName.id === totalHours.projectId)
             })
             record.hourProject.name = record.getprojectName.name
           }
           this.chartOptions.series[0].data.push(record.hourProject)
         })
       })
     },
     getEmployeeRecords () {
       this.fetchDetails(this.employeeURL).then((employeeDetails) => {
         this.totalUsers = Object.keys(employeeDetails).length
       })
     }
   },
  mixins: [action],
  mounted () {
    this.getEmployeeRecords()
    this.getProjectRecords()
  },
  computed: {
    items () {
      return [
        {
          title: 'Total Projects',
          icon: 'mdi-view-dashboard',
          path: '/project',
          color: 'pink darken-1',
          cols: 4,
          text: this.totalProjects
        },
        {
          title: 'Total Users',
          icon: 'mdi-account',
          path: '/employee',
          color: 'primary',
          cols: 4,
          text: this.totalUsers
        },
        {
          title: 'Total  Hours',
          icon: 'mdi-clock',
          path: '/hours',
          color: 'orange darken-3',
          cols: 4,
          text: this.totalHours
        }
      ]
    }
  },
  components: {
    highcharts: Chart
  }
}
</script>
<style scoped>
.space{
  margin-top: 20px;
  margin-left: 20px;
}
.textColor{
  color: black;
  text-align: center;
  text-decoration: none;
}
  .v-sheet--offset {
    top: -24px;
    position: relative;
    text-align: center;
  }
  .textAlignment{
    color:white;
    margin-top:20px;
  }
</style>
