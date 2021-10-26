<template>
<v-app>
  <h4>View Tasks Based on the Date</h4>
<full-calendar :events="events" :config="config" @event-selected="showEvent"></full-calendar>
    <v-dialog v-model="dialog"  persistent max-width="700px">
        <v-card>
          <v-toolbar color="success" dark close-delay>Project: {{item.projectName}}
          </v-toolbar>
          <v-card-text>
            <v-container class="font-weight-black">
              <formFields :formFields="fields" @hideDialog="hideDialog" :buttons="true" @save="updateTask" ref="clear"></formFields>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
</v-app>
</template>
<script>
/* eslint-disable */
import { FullCalendar } from 'vue-full-calendar'
import moment from 'moment'
import formFields from '../components/forms.vue'
export default {
  data () {
    return {
      url: 'https://traineesapi.firebaseio.com/task',
      events: [],
      config: {
        editable: false,
        defaultView: 'month'
      },
      time: 0,
      projectUrl: 'https://traineesapi.firebaseio.com/project',
      employeeUrl: 'https://traineesapi.firebaseio.com/employee',
      projectRecords: [],
      dialog: false,
      taskRecords: [],
      item: {},
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
      id: null,
      projectName: ''
    }
  },
  component: {
    fullcalendar: FullCalendar
  },
  methods: {
    async  fetchtaskDetails () {
      const project = await this.fetchDetails(this.projectUrl)
      const employee = await this.fetchDetails(this.employeeUrl)
      this.events = []
      this.fetchDetails(this.url).then((taskDetails) => {
        taskDetails.forEach((task) => {
          const projectName = project.find(projectArray => projectArray.id === task.projectId)
          task.projectName = projectName.name
          const employeeName = employee.find(employeeArray => employeeArray.id === task.employeeId)
          task.empName = employeeName.name
          const eventObject = {}
          eventObject.title = task.name
          eventObject.start = moment(task.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          eventObject.end = moment(task.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          eventObject.textColor = 'white'
          eventObject.allDay = true
          eventObject.backgroundColor = 'Chocolate'
          eventObject.empName = employeeName.name
          eventObject.projectName = projectName.name
          eventObject.status = task.status
          eventObject.priority = task.priority
          eventObject.startDate = task.startDate
          eventObject.endDate = task.endDate
          eventObject.id = task.id
          this.events.push(eventObject)
          console.log(this.events);
        })
      })
    },
    fetchEmployeeDetails () {
      this.fetchDetails(this.employeeUrl).then((employeeDetails) => {
        this.fields.forEach((records) => {
          if (records.property === 'employeeName') {
            records.items = employeeDetails
          }
        })
      })
    },
     hideDialog (dialog) {
      this.dialog = dialog
    },
    async showEvent (value) {
      this.selectedOpen = true
      this.dialog = true
      this.taskRecords = value.target
      this.item = value
      this.id = value.id
      this.projectName = value.projectName
      const fetchRecord = await this.editDetails(this.url, this.item.id)
      this.$root.$emit('details', fetchRecord.data)
    },
    async updateTask(task) {
     this.time = task.spendTime
      task.spendTime = 0
      const dateTime = { time: moment().format('LT'), date: moment().format('DD/MM/YYYY') }
      task.updatedOn = `${dateTime.date} ${dateTime.time}`
      const project = await this.fetchDetails(this.projectUrl)
      const projectid = project.find(projectName => projectName.name == this.projectName)
      task.projectId = projectid.id
      this.fetchDetails(this.employeeUrl).then((employeeDetails) => {
        const employee = employeeDetails.find(employee => employee.name === task.employeeName)
        task.employeeId = employee.id
          task.spendTime = this.time
          this.updateDetails(this.url, this.id, task).then(() => {
            this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'primary', snackBar: true, time: 2 })
            this.dialog = false
            this.fetchtaskDetails()
          })
      })
    }
    
  },
  mounted () {
    this.fetchtaskDetails()
    this.fetchEmployeeDetails()
  },
  components: {
    formFields
  }
}
</script>
<style>

</style>
