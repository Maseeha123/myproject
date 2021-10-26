<template>
  <div>
          {{$route.query.activity}}
    <v-row justify="end" class="right mr-8" >
    <v-btn  color="primary" @click="$router.push('/viewProject')" dark><v-icon dark left class="mx-2"> mdi-arrow-left</v-icon> Back</v-btn>
    </v-row>
    <v-card class="top">
      <v-tabs v-model="active" background-color="primary" prominent center-active dark grow>
        <v-tab ripple>
          Tasks
        </v-tab>
        <v-tab ripple>
          details
        </v-tab>
        <v-tab-item>
          <renderTable :tableHeader="taskTableHeader" :addButton="addButton" @deleteItems="getRecords"  @logTime="addHours" :disableButton="disableButton" @edit="editTask"  :loading="isloading" :tableBody=" taskTableBody" @add="goToTask" :showTable="showTable" isEditable:isEditable class="alignTable" />
        </v-tab-item>
        <v-tab-item>
          <v-card :disabled="$store.state.userDetails.admin === true ? false : true">
             <project/>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" v-if="showHideDialog" persistent max-width="700px">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-icon small>mdi-clock</v-icon>&nbsp; Log Time
          </v-toolbar>
          <v-card-text>
            <v-container>
              <formFields :formFields="fields" @save="logTime" :isButtonShow="isButtonShow"  @hideDialog="hideDialog" :cancel="cancelButton" ref="clear"></formFields>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItems">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>
<script>
import action from '../mixins/action'
import renderTable from '../components/table.vue'
import formFields from '../components/forms.vue'
import project from '../views/project.vue'
export default {
  name: 'employee',
  data () {
    return {
      taskTableBody: [],
      active: '',
      showTable: true,
      isEditable: true,
      projectName: '',
      url: 'https://traineesapi.firebaseio.com/task',
      projectURL: 'https://traineesapi.firebaseio.com/project',
      hoursURL: 'https://traineesapi.firebaseio.com/hours',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      id: null,
      taskTableHeader: [{
        text: 'Task Name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Assignee',
        value: 'employeename'
      },
      {
        text: 'Description',
        value: 'description'
      },
      {
        text: 'Task Priority',
        value: 'priority'
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Start Date',
        value: 'startDate'
      },
      {
        text: 'End Date',
        value: 'endDate'
      },
      {
        text: 'Spend Time',
        value: 'spendTime'
      },
      {
        text: 'Log time',
        value: 'task',
        sortable: false
      },
      {
        text: 'Created On',
        value: 'updatedOn'
      }
      ],
      isloading: true,
      tab: null,
      fields: [{
        property: 'date',
        type: 'date',
        picker: 'picker',
        label: 'Date',
        col: 6,
        nameRules: [v => !!v || 'Date is required']
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
        nameRules: [
          v => !!v || 'Activity'
        ],
        items: ['Development', 'Testing', 'Meeting', 'Support', 'Research', 'Others']
      },
      {
        type: 'textarea',
        label: 'Comment',
        property: 'comment',
        col: 6,
        rows: 2,
        nameRules: [
          v => !!v || 'Comment is required',
          v => /^[A-Za-z. ]{3,}$/.test(v) || 'Comment must be valid'
        ]
      }
      ],
      showHideDialog: false,
      dialog: true,
      isButtonShow: true,
      taskId: null,
      backButton: false,
      cancelButton: false,
      addButton: true,
      hoursArray: [],
      dialogDelete: false,
      deleteRecords: [],
      taskRecords: []
    }
  },
  components: {
    renderTable,
    formFields,
    project
  },
  mounted () {
    this.fetchTaskDetails()
    this.fetchProjectDetails()
    this.fetchHoursDetails()
    this.$root.$on('deleteSucess', () => {
      this.fetchTaskDetails()
    })
  },
  beforeDestroy () {
    this.$root.$off('deleteSucess')
  },
  methods: {
    async fetchTaskDetails () {
      const taskDetails = await this.fetchDetails(this.url)
      this.taskRecords = taskDetails
      const employeeDetails = await this.fetchDetails(this.employeeURL)
      taskDetails.forEach((task) => {
        const emp = employeeDetails.find(employee => employee.id === task.employeeId)
        if (emp) task.employeename = emp.name
      })
      if (this.$store.state.userDetails.admin) {
        this.taskTableBody = taskDetails.filter((task) => task.projectId === this.$route.params.id)
      } else {
        this.taskTableBody = taskDetails.filter((task) => task.projectId === this.$route.params.id && task.employeeId === this.$store.state.userDetails.id)
      }
    },
    fetchProjectDetails () {
      this.fetchDetails(this.projectURL).then((projectDetails) => {
        const project = projectDetails.find((project) => project.id === this.$route.params.id)
        this.projectName = project.name
      })
    },
    fetchHoursDetails () {
      this.fetchDetails(this.hoursURL).then((hoursDetails) => {
        this.hoursArray = hoursDetails
      })
    },
    editTask (id) {
      this.$router.push({ path: `/viewProject/task/${this.$route.params.id}`, query: { taskId: `${id}` } })
    },
    deleteItems () {
      this.deleteRecords.forEach((item) => {
        this.deleteDetails(this.url, item.id)
      })
      this.dialogDelete = false
      this.fetchTaskDetails()
    },
    goToTask () {
      this.$router.push(`/viewProject/task/${this.$route.params.id}`)
    },
    goToProject () {
      this.$router.push('/viewProject')
    },
    updateProject () {
      this.$router.push(`/project/${this.$route.params.id}`)
    },
    addHours (id) {
      if (this.$store.state.userDetails.admin === true) {
        this.showHideDialog = true
        this.dialog = true
      }
      // this.showHideDialog = true
      // this.dialog = true
      this.taskId = id
    },
    hideDialog (dialog) {
      this.dialog = dialog
    },
    logTime (hour) {
      const taskDetails = this.taskTableBody.find((task) => task.id === this.taskId)
      hour.projectName = this.projectName
      hour.projectId = this.$route.params.id
      hour.taskId = taskDetails.id
      hour.taskName = taskDetails.name
      hour.employeeId = taskDetails.employeeId
      hour.name = taskDetails.employeeName
      hour.hour = Number(hour.hour)
      this.editDetails(this.url, this.taskId).then((respose) => {
        this.task = respose.data
        this.task.spendTime += hour.hour
        const updateDetails = this.task
        this.updateDetails(this.url, this.taskId, updateDetails).then(() => {})
      })
      this.saveDetails(this.hoursURL, hour).then(() => {
        this.$root.$emit('snackBar', { text: 'Hours Added', color: 'primary', snackBar: true })
        this.$refs.clear.$refs.form.reset()
        this.fetchTaskDetails()
        this.task.spendTime = 0
      })
      this.hideDialog()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    getRecords (item) {
      this.dialogDelete = true
      this.deleteRecords = item
    }
  },
  mixins: [action],
  computed: {
    projectTab () {
      if (this.$store.state.userDetails.admin === true) {
        return true
      } else {
        return false
      }
    },
    disableButton () {
      if (this.$store.state.userDetails.admin === true) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.buttonSpace{
margin-top: 20px;
margin-left: 10px;
}
.alignTable{
margin-top: 20px;
}
.alignCenter{
  text-align: center;
}
.top{
  margin-top: 30px
}
.right{
    margin-top: 10px;
}
</style>
