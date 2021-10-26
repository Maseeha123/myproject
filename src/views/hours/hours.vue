<template>
  <div>
    <renderTable :tableHeader="hoursTableHeader" @edit="editHour"  @deleteItems="getRecords"  :loading="isloading" :addButton="addButton" :tableBody="hoursTableBody" @add="goToHours" :showTable="showTable" isEditable:isEditable class="alignTable" />
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
/* eslint-disable */
import renderTable from '../../components/table.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'hours',
  data () {
    return {
      hoursTableBody: [],
      showTable: true,
      isEditable: true,
      hoursButton: false,
      url: 'https://traineesapi.firebaseio.com/hours',
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
      }],
      isloading: false,
      addButton: true,
      dialogDelete: false,
      deleteRecords: [],
      employeeRecords: [],
      taskRecords: [],
      projectRecords: [],
      projectURL: 'https://traineesapi.firebaseio.com/project',
      taskURL: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee'
    }
  },
  components: {
    renderTable
  },
  mounted () {
    this.fetchHoursDetails()
    this.$root.$on('deleteSucess', () => {
      this.fetchHoursDetails()
    })
  },
  computed: {
    ...mapGetters(['userDetails'])
  },
  methods: {
    async fetchHoursDetails () {
      const hoursDetails = await this.fetchDetails(this.url)
      const employeeDetails = await this.fetchDetails(this.employeeURL)
      const projectDetails = await this.fetchDetails(this.projectURL)
      const taskDetails = await this.fetchDetails(this.taskURL)
      const record = { employee: {}, task: {}, project: {} }
      hoursDetails.forEach((hours) => {
        record.employee = employeeDetails.find(employeeName => employeeName.id === hours.employeeId)
        record.project = projectDetails.find(projectName => projectName.id === hours.projectId)
        record.task = taskDetails.find(taskName => taskName.id === hours.taskId)
        if (record.employee) hours.name = record.employee.name
        if (record.project) hours.projectName = record.project.name
        if (record.task) hours.taskName = record.task.name
      })
      this.hoursTableBody = hoursDetails
      this.hoursButton = true
      this.isloading = true
    },
    deleteItems () {
      if (this.deleteRecords.length) {
        this.deleteRecords.forEach((item) => {
          this.deleteDetails(this.url, item.id)
        })
      }
      this.dialogDelete = false
      this.fetchHoursDetails()
    },
    editHour (id) {
      this.$router.push(`/hours/add/${id}`)
    },
    goToHours () {
      this.$router.push('/hours/add')
    },
    closeDelete () {
      this.dialogDelete = false
    },
    getRecords (item) {
      this.dialogDelete = true
      this.deleteRecords = item
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
</style>
