<template>
  <div>
    <v-card>
          <v-card-title>Add Hour</v-card-title>
          <v-card-text>
         <app-formFields :formFields="fields" :records="records" @save="getTask" @back="backToHours" :cancel="cancelButton" :isButtonShow="isButtonShow" @sendValues="getValues"></app-formFields>
        </v-card-text>
      </v-card>
    <v-row>
    <v-dialog v-model="showHideDialog" v-if="showHideDialog" persistent max-width="700px">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-icon small>mdi-clock</v-icon>&nbsp; Log Time
          </v-toolbar>
          <v-card-text>
            <v-container>
              <app-formFields :formFields="logTimefields"  @hideDialog="hideDialog" :isButtonShow="isButtonShow"  ref="clear"></app-formFields>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
import action from '../mixins/action'
import formFields from '../components/forms.vue'
export default {
  data () {
    return {
      records: {},
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
      hours: {},
      actitvity: ['Development', 'Testing', 'Meeting', 'Support', 'Research', 'Others'],
      hourToupdate: 0,
      cancelButton:true,
      logTimefields: [{
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
      showHideDialog:false
    }
  },
  watch: {
    'records.name' () {
     alert(' i nm a o')
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
    getTaskRecords () {
      this.fetchDetails(this.taskURL).then((taskDetails) => {
        this.fields.forEach((records) => {
          if (records.property === 'name') records.items = employeeDetails
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
      this.showHideDialog= true
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
     hideDialog (dialog) {
      this.showHideDialog = dialog
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
            this.task.spendTime = this.task.spendTime
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
        this.hourToupdate = fetchRecord.data.hour
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
      }
    },
     reciveNames () {
      this.$root.$on('names', (data) => {
      console.log(data)
     let employeeID = this.employeeRecords.find(employee => employee.name === data)
      console.log(employeeID.id)
      })
    },
    backToHours() {
      this.$router.push('/viewHours')
    },
    getValues(item){
        console.log(item)
        alert('hggg')
    },
    async fetchHoursDetails () {
        let hoursDetails = await this.fetchDetails(this.url)
         let employeeDetails = await  this.fetchDetails(this.employeeURL)
         
        const record = {employee: {},task: {},project: {}}
        hoursDetails.forEach((hours) =>{
          record.employee = employeeDetails.find(employeeName => employeeName.id === hours.employeeId)
          record.project = projectDetails .find(projectName => projectName.id === hours.projectId)
          record.task = taskDetails.find(taskName => taskName.id === hours.taskId)
         if(record.employee) hours.name = record.employee.name
         if(record.project) hours.projectName = record.project.name
         if(record.task) hours.taskName = record.task.name
         })
          this.hoursTableBody = hoursDetails
          this.hoursButton = true
          console.log(record)  
    },
      // 4. simple calculator (include add, sub, mul & division)
        // calculator(1,2,"+"); //=> 3
        // calculator(1,2,"&"); //=> "unknown value"
  calculator(a,b,str)
        {
                switch(str)
                {
                    case '+': return a+b;
                    case '-': return a-b;
                    case '*': return a*b;
                    case '%': return a%b;
                    default: return "unknown value";
                }
        }
  //   console.log(calculator(1,2,"!"));
  // },
  },
  mounted () {
    this.getProjectRecords()
    this.getEmployeeRecords()
    this.getTaskRecords()
    this.editHours()
    this.reciveNames ()
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
