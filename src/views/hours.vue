<template>
  <v-app>
    <app-formFields :formFields="fields" @save="getTask" @back="backToHours" :cancel="cancelButton" :isButtonShow="isButtonShow"></app-formFields>
    <v-row>
      <v-dialog v-model="dialog" v-if="showHideDialog"  persistent max-width="700px">
        <v-card>
            <v-toolbar color="primary" dark>
            <v-icon small>mdi-clock</v-icon>&nbsp; Log Time
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-select :items="taskNames" hide-details item-text="name" clearable  v-model="hours.taskName" label="Task" dense outlined></v-select>
                </v-col>
                <v-col cols="6">
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field hide-details v-model="sdate" label="Date"   clearable dense prepend-icon="mdi-calendar" readonly outlined v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker hide-details v-model="sdate" color="green lighten-1" @input="menu2 = false"></v-date-picker>
              </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field type="number" hide-details label="Hours" v-model="hours.hour" outlined dense clearable></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select :items="actitvity" hide-details item-text="name" label="Actitvity" clearable v-model="hours.activity" dense outlined></v-select>
                </v-col>
              </v-row>
                <v-row>
                <v-col cols="12">
                <v-textarea hide-details rows="2" label="Comment" outlined dense clearable v-model="hours.comment"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  class="ma-2" color="primary" dark  @click="dialog = false;saveHours()">
             Save Hour
            </v-btn>
             <v-btn color="primary"  @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>
<script>
import moment from 'moment'
import action from '../mixins/action'
import formFields from '../components/forms.vue'
export default {
  data () {
    return {
      menu2: false,
      fields: [{
        type: 'select',
        label: 'User name',
        property: 'name',
        col: 6,
        items: [],
        text: 'name',
        show: true,
        nameRules: [v => !!v || 'User is required']
      },
      {
        type: 'select',
        label: 'Project Name',
        property: 'projectName',
        col: 6,
        items: [],
        text: 'name',
        nameRules: [v => !!v || 'Project is required'],
        show: true
      }],
      dialog: false,
      sdate: moment(this.sdate).format('YYYY-MM-DD'),
      hours: {
        sdate: moment().format('YYYY-MM-DD')
      },
      employeeRecords: [],
      projectRecords: [],
      taskRecords: [],
      taskNames: [],
      projectURL: 'https://traineesapi.firebaseio.com/project',
      taskURL: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      hoursURL: 'https://traineesapi.firebaseio.com/hours',
      projectID: null,
      taskID: null,
      showHideDialog: true,
      isButtonShow: true,
      // hours: {},
      actitvity: ['Development', 'Testing', 'Meeting', 'Support', 'Research', 'Others'],
      hourToupdate: 0,
      cancelButton: true
    }
  },
  mixins: [action],
  methods: {
    getProjectRecords () {
      this.fetchDetails(this.projectURL).then((projectDetails) => {
        this.projectRecords = projectDetails
        this.fields.forEach((records) => {
          if (records.property === 'projectName') {
            records.items = projectDetails
          }
        })
      })
    },
    getEmployeeRecords () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.employeeRecords = employeeDetails
        this.fields.forEach((records) => {
          if (records.property === 'name') records.items = employeeDetails
        })
      })
    },
    async getTaskRecords () {
      this.fetchDetails(this.taskURL).then((taskDetails) => {
        this.taskRecords = taskDetails
      })
    },
    getTask (hours) {
      const employee = this.employeeRecords.find(employee => employee.name === hours.name)
      hours.employeeId = employee.id
      const project = this.projectRecords.find(project => project.name === hours.projectName)
      hours.projectId = project.id
      this.taskNames = this.taskRecords.filter((taskNames) => taskNames.employeeId === hours.employeeId && taskNames.projectId === hours.projectId)
      this.hours = hours
      if (this.taskNames.length) {
        this.dialog = true
      } else {
        this.$root.$emit('snackBar', { text: 'No Task Found', color: 'error', snackBar: true })
        this.dialog = false
      }
    },
    hoursFormFields () {
      this.hours.date = moment(this.hours.sdate).format('DD/MM/YYYY')
      this.hours.hour = Number(this.hours.hour)
      const task = this.taskRecords.find(task => task.name === this.hours.taskName)
      this.hours.taskId = task.id
      this.editDetails(this.taskURL, task.id).then((respose) => {
        this.task = respose.data
        this.task.spendTime += this.hours.hour
        const updateDetails = this.task
        this.updateDetails(this.taskURL, task.id, updateDetails).then(() => {})
      })
      return this.hours
    },
    saveHours () {
      const saveHours = this.hoursFormFields()
      if (saveHours.id === this.$route.params.id) {
        this.saveDetails(this.hoursURL, saveHours).then(() => {
          this.$root.$emit('snackBar', { text: 'Hour Added', color: 'green darken-1', snackBar: true })
          this.task.spendTime = 0
          this.hours = {}
          this.$router.push('/viewHours')
        })
      } else {
        this.editDetails(this.taskURL, this.hours.taskId).then((respose) => {
          this.task = respose.data
          if (this.hourToupdate < this.hours.hour) {
            this.task.spendTime += this.hours.hour
          } else if (this.hourToupdate === this.hours.hour) {
            const time = this.task.spendTime
            // this.task.spendTime = this.task.spendTime
            this.task.spendTime = time
          } else this.task.spendTime -= this.hours.hour
          const updateDetails = this.task
          this.updateDetails(this.taskURL, this.hours.taskId, updateDetails).then(() => {})
        })
        this.updateDetails(this.hoursURL, this.$route.params.id, saveHours).then(() => {
          this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'light-blue darken-3', snackBar: true })
          this.$router.push('/viewHours')
        })
      }
    },
    async deleteHours (id) {
      await this.deleteDetails(this.hoursURL, id)
    },
    async editHours () {
      const fetchRecord = await this.editDetails(this.hoursURL, this.$route.params.id)
      if (fetchRecord.data) {
        console.log(fetchRecord.data)
        this.hourToupdate = fetchRecord.data.hour
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
      }
    },
    backToHours () {
      this.$router.push('/viewHours')
    }
  },
  mounted () {
    this.getProjectRecords()
    this.getEmployeeRecords()
    this.getTaskRecords()
    this.editHours()
  },
  components: {
    'app-formFields': formFields
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
