<template>
  <div>
    <v-row justify="end" class="mt-2 mr-1">
      <v-btn color="primary" @click="backToTask()" dark>
        <v-icon dark left class="mx-2"> mdi-arrow-left</v-icon> Back
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :disabled="$store.state.userDetails.admin === true ? false : true">
          <v-card-text>
            <app-formFields :formFields="fields" @save="saveUpdatTask" @back="backToTask" :isButtonShow="isButtonShow" :cancel="cancelButton"></app-formFields>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="showDetails">
      <v-divider dark color="error"></v-divider>
      <v-row justify="end">
        <v-btn color="primary" :disabled="disableButton" @click="showHideDialog = true" class="log">Log Time</v-btn>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="showHideDialog" v-if="showHideDialog" persistent max-width="700px">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-icon small>mdi-clock</v-icon>&nbsp; Log Time
            </v-toolbar>
            <v-card-text>
              <v-container>
                <app-formFields :formFields="logTimefields" @save="savelogHours" @hideDialog="hideDialog" :isButtonShow="isButtonShow" ref="clear"></app-formFields>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-col cols="12">
          <renderTable :tableHeader="hoursTableHeader" :loading="isloading" :tableBody="hoursTableBody" :addButton="addButton" :showTable="showTable" isEditable:isEditable />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import formFields from '../components/forms.vue'
import renderTable from '../components/table.vue'
export default {
  data () {
    return {
      employeeRecords: [],
      showTable: true,
      url: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      projectUrl: 'https://traineesapi.firebaseio.com/project',
      hourUrl: 'https://traineesapi.firebaseio.com/hours',
      fields: [{
        type: 'text',
        label: 'Task Name',
        property: 'name',
        col: 6,
        rules: this.nameValidate
      },
      {
        type: 'select',
        label: 'Assignee',
        property: 'employeeName',
        col: 6,
        items: [],
        rules: this.emptyField,
        text: 'name'
      },
      {
        type: 'select',
        label: 'Priority',
        property: 'priority',
        col: 6,
        items: ['Low', 'Normal', 'High', 'Immediate'],
        rules: this.emptyField
      },
      {
        type: 'select',
        label: 'Status',
        property: 'status',
        col: 6,
        items: ['New', 'Developed', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
        rules: this.emptyField
      },
      {
        type: 'date',
        label: 'Start Date',
        property: 'startDate',
        picker: 'startPicker',
        col: 6,
        rules: this.emptyField,
        menu: false
      },
      {
        type: 'date',
        label: 'End  Date',
        property: 'endDate',
        col: 6,
        menu: false,
        rules: this.emptyField,
        allowedDates: true,
        picker: 'endPicker'
      },
      {
        type: 'textarea',
        label: 'Description',
        property: 'description',
        col: 12,
        rows: 2,
        rules: this.nameValidate
      }],
      isButtonShow: true,
      spendTime: 0,
      cancelButton: true,
      logTimefields: [{
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
        col: 6,
        rows: 2,
        rules: this.nameValidate
      }
      ],
      showHideDialog: false,
      hoursTableHeader: [{
        text: 'Assignee',
        value: 'name'
      },
      {
        text: 'Project',
        value: 'projectName'
      },
      {
        text: 'Task',
        value: 'taskName'
      },
      {
        text: 'Date',
        value: 'date'
      },
      {
        text: 'Hours',
        value: 'hour'
      },
      {
        text: 'Activity',
        value: 'activity'
      },
      {
        text: 'Comment',
        value: 'comment'
      }
      ],
      isloading: true,
      hoursTableBody: [],
      addButton: false,
      showDetails: false,
      taskRecords: []
    }
  },
  methods: {
    saveUpdatTask (task) {
      task.spendTime = 0
      const dateTime = { time: moment().format('LT'), date: moment().format('DD/MM/YYYY') }
      task.updatedOn = `${dateTime.date} ${dateTime.time}`
      task.projectId = this.$route.params.id
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        const employee = employeeDetails.find(employee => employee.name === task.employeeName)
        task.employeeId = employee.id
        if (task.id === this.$route.query.taskId) {
          this.saveDetails(this.url, task).then(() => {
            this.$root.$emit('snackBar', { text: 'Task Added', color: 'green darken-1', snackBar: true })
            this.$router.push(`/viewProject/viewTask/${this.$route.params.id}`)
          })
        } else {
          task.spendTime = this.spendTime
          this.updateDetails(this.url, this.$route.query.taskId, task).then(() => {
            this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'green darken-1', snackBar: true, time: 2 })
            this.$router.push(`/viewProject/viewTask/${this.$route.params.id}`)
          })
        }
      })
    },
    backToTask () {
      this.$router.push(`/viewProject/viewTask/${this.$route.params.id}`)
    },
    async editTask () {
      const fetchRecord = await this.editDetails(this.url, this.$route.query.taskId)
      if (fetchRecord.data) {
        this.spendTime = fetchRecord.data.spendTime
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
        this.showDetails = true
      }
    },
    fetchEmployeeDetails () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.fields.forEach((records) => {
          if (records.property === 'employeeName') {
            records.items = employeeDetails
          }
        })
      })
    },
    hideDialog (dialog) {
      this.showHideDialog = dialog
    },
    savelogHours (hour) {
      this.hideDialog()
      this.fetchDetails(this.url).then((taskDetails) => {
        const task = taskDetails.find(task => task.id === this.$route.query.taskId)
        hour.taskId = this.$route.query.taskId
        hour.taskName = task.name
        hour.projectId = task.projectId
        hour.employeeId = task.employeeId
        hour.name = task.employeeName
        hour.hour = Number(hour.hour)
        this.fetchDetails(this.projectUrl).then((projectDetails) => {
          const project = projectDetails.find(project => project.id === this.$route.params.id)
          hour.projectName = project.name
          this.editDetails(this.url, hour.taskId).then((respose) => {
            this.task = respose.data
            this.task.spendTime += hour.hour
            const updateDetails = this.task
            this.updateDetails(this.url, hour.taskId, updateDetails).then(() => {})
          })
          this.saveDetails(this.hourUrl, hour).then(() => {
            this.$root.$emit('snackBar', { text: 'Hour Added', color: 'primary', snackBar: true })
          })
        })
      })
    },
    async fetchHoursDetails () {
      const hoursDetails = await this.fetchDetails(this.hourUrl)
      const employeeDetails = await this.fetchDetails(this.employeeURL)
      const projectDetails = await this.fetchDetails(this.projectUrl)
      const taskDetails = await this.fetchDetails(this.url)
      const record = { employee: {}, task: {}, project: {} }
      hoursDetails.forEach((hours) => {
        record.employee = employeeDetails.find(employeeName => employeeName.id === hours.employeeId)
        record.project = projectDetails.find(projectName => projectName.id === hours.projectId)
        record.task = taskDetails.find(taskName => taskName.id === hours.taskId)
        if (record.employee) hours.name = record.employee.name
        if (record.project) hours.projectName = record.project.name
        if (record.task) hours.taskName = record.task.name
      })
      if (this.$store.state.userDetails.admin) {
        this.hoursTableBody = hoursDetails.filter(hours => hours.taskId === this.$route.query.taskId)
      } else {
        this.hoursTableBody = hoursDetails.filter(hours => hours.taskId === this.$route.query.taskId && hours.employeeId === this.$store.state.userDetails.id)
      }
    },
    fetchTaskDetails () {
      this.fetchDetails(this.url).then((projectDetails) => {
        this.taskRecords = projectDetails
      })
    }
  },
  mounted () {
    this.editTask()
    this.fetchEmployeeDetails()
    this.fetchHoursDetails()
    this.fetchTaskDetails()
  },
  components: {
    'app-formFields': formFields,
    renderTable
  },
  computed: {
    disableButton () {
      if (this.$store.state.userDetails.admin === true) {
        return false
      }
      const hour = this.taskRecords.find(hours => hours.employeeId === this.$store.state.userDetails.id)
      if (hour) return false
      else {
        return true
      }
    }
  }
}
</script>
<style scoped>
.textalign{
  margin-left: 20px;
  margin-top: 50px;
}
.btn{
     margin-left: 10px;
     float: right;
     margin-right: 10px;
     position: relative;
     margin-top: 2px;
}
.log{
  margin-top:20px;
  margin-right:20px;
}
</style>
