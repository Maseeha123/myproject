<template>
  <div>
    {{this.getTasks}}
    {{this.records}}
    <v-card>
      <v-card-title>Add Hour</v-card-title>
         <formFields :formFields="fields" :record="records" :buttons="false"></formFields>
          <span v-if="showHideDialog">
        <formFields :formFields="logTimefields" :record="records" :buttons="true" @save="saveUpdateHour"></formFields>
          </span>
     </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import formFields from '../../components/forms.vue'
export default {
  data () {
    return {
      records: {},
      employeeRecords: [],
      projectRecords: [],
      taskRecords: [],
      taskNames: [],
      projectURL: 'https://traineesapi.firebaseio.com/project',
      taskURL: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      hoursURL: 'https://traineesapi.firebaseio.com/hours',
      showHideDialog: false,
      employeeId: null,
      projectId: null,
      buttons: true,
      projects: [],
      hourToupdate: 0
    }
  },
  computed: {
    fields () {
      return [{
        type: 'select',
        label: 'User name',
        property: 'name',
        col: 6,
        items: this.employeeRecords,
        text: 'name',
        show: true,
        rules: this.emptyField
      },
      {
        type: 'select',
        label: 'Project Name',
        property: 'projectName',
        col: 6,
        items: this.getProjectNames,
        text: 'name',
        rules: this.emptyField,
        show: true
      }]
    },
    logTimefields () {
      return [{
        type: 'select',
        label: 'Task',
        property: 'task',
        col: 6,
        items: this.getTasks,
        text: 'name',
        show: true,
        rules: this.emptyField
      },
      {
        property: 'date',
        type: 'date',
        picker: 'picker',
        label: 'Date',
        col: 6,
        rules: this.emptyField
      },
      {
        type: 'number',
        label: 'Hours',
        property: 'hour',
        col: 6
      },
      {
        type: 'select',
        label: 'Activity',
        property: 'activity',
        col: 6,
        rules: this.emptyField,
        items: ['Development', 'Testing', 'Meeting', 'Support', 'Research', 'Others']
      },
      {
        type: 'textarea',
        label: 'Comment',
        property: 'comment',
        col: 12,
        rows: 2,
        rules: this.nameValidate
      }
      ]
    },
    employeeNames () {
      return this.records.name
    },
    getProjectNames () {
      const projectArray = []
      if (this.employeeNames) {
        const records = { employee: {}, task: [] }
        records.employee = this.employeeRecords.find(employee => employee.name === this.employeeNames)
        records.task = this.taskRecords.filter(task => task.employeeId === records.employee.id)
        records.task.forEach((aaa) => {
          records.project = this.projectRecords.find(project => project.id === aaa.projectId)
          projectArray.push(records.project)
        })
      }
      return projectArray
    },
    project () {
      return this.records.projectName
    }
    // getTasks () {
    //   const records = { employee: {}, project: {} }
    //    if(this.employeeNames && this.project) {
    //     records.employee = this.employeeRecords.find(employee => employee.name === this.employeeNames)
    //     if (records.employee) this.employeeId = records.employee.id
    //     records.project = this.projectRecords.find(project => project.name === this.project)
    //     if (records.project) {
    //       this.projectId = records.project.id
    //       this.taskNames = this.taskRecords.filter((task) => task.employeeId === records.employee.id && task.projectId === records.project.id)
    //     }
    //     if (this.taskNames.length) {
    //        this.showHideDialog = true
    //       return this.taskNames
    //     } else {
    //     this.showHideDialog = false
    //     return []
    //   }
    //  }
    // }
  },
  methods: {
    async getDetails () {
      this.employeeRecords = await this.fetchDetails(this.employeeURL)
      this.projectRecords = await this.fetchDetails(this.projectURL)
      this.taskRecords = await this.fetchDetails(this.taskURL)
    },
    saveUpdateHour (hours) {
      hours.hour = Number(hours.hour)
      const taskName = this.taskRecords.find(task => task.name === hours.task)
      hours.employeeId = this.employeeId
      hours.projectId = this.projectId
      hours.taskId = taskName.id
      this.editDetails(this.taskURL, hours.taskId).then((respose) => {
        this.task = respose.data
        this.task.spendTime += hours.hour
        const updateDetails = this.task
        this.updateDetails(this.taskURL, hours.taskId, updateDetails).then(() => {})
      })
      if (hours.id === this.$route.params.id) {
        this.saveDetails(this.hoursURL, hours).then(() => {
          this.$root.$emit('snackBar', { text: 'Hour Added', color: 'green darken-1', snackBar: true })
          this.task.spendTime = 0
          this.hours = {}
          this.$router.push('/hours')
        })
      } else {
        this.editDetails(this.taskURL, hours.taskId).then((respose) => {
          this.task = respose.data
          if (this.hourToupdate < hours.hour) {
            this.task.spendTime += hours.hour
          } else if (this.hourToupdate === hours.hour) {
            this.task.spendTime = this.task.spendTime
          } else this.task.spendTime -= hours.hour
          const updateDetails = this.task
          this.updateDetails(this.taskURL, hours.taskId, updateDetails).then((respose) => {})
        })
        this.updateDetails(this.hoursURL, this.$route.params.id, hours).then(() => {
          this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'light-blue darken-3', snackBar: true })
          this.$router.push('/hours')
        })
      }
    },
    async editHours () {
      const fetchRecord = await this.editDetails(this.hoursURL, this.$route.params.id)
      if (fetchRecord.data) {
        this.showHideDialog = true
        this.records = fetchRecord.data
        this.hourToupdate = fetchRecord.data.hour
        this.$root.$emit('details', fetchRecord.data)
      }
    },
     getTasks () {
       console.log(this.records.projectName)
             const records = { employee: {}, project: {} }
      //  if(this.employeeNames && this.project) {
        if(this.records.name && this.records.projectName)
        alert('ffff')
        records.employee = this.employeeRecords.find(employee => employee.name === this.employeeNames)
        if (records.employee) this.employeeId = records.employee.id
        records.project = this.projectRecords.find(project => project.name === this.project)
        if (records.project) {
          this.projectId = records.project.id
          this.taskNames = this.taskRecords.filter((task) => task.employeeId === records.employee.id && task.projectId === records.project.id)
        }
        if (this.taskNames.length) {
           this.showHideDialog = true
          return this.taskNames
        } else {
        this.showHideDialog = false
        return []
      //}
     }
    }
  },
  mounted () {
    this.editHours()
    this.getDetails()
    this.getTasks ()
  },
  components: {
    formFields
  }
}
</script>
<style scoped>
.textalign{
  margin-left: 20px;
  margin-top: 50px;
}
.btn{
  margin-left: 40px;
}
</style>
