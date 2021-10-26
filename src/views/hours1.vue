<template>
  <div>
    <v-card>
      <v-card-title>Add Hour</v-card-title>
          <v-card-text>
         <app-formFields :formFields="fields" :record="records" @save="getTask"></app-formFields>
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
              <app-formFields :formFields="logTimefields" @hideDialog="hideDialog" @save="saveUpdateHour"></app-formFields>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import action from '../mixins/action'
import formFields from '../components/forms.vue'
export default {
  data () {
    return {
      records:{},
      employeeRecords: [],
      projectRecords: [],
      taskRecords: [],
      taskNames: [],
      projectURL: 'https://traineesapi.firebaseio.com/project',
      taskURL: 'https://traineesapi.firebaseio.com/task',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      hoursURL: 'https://traineesapi.firebaseio.com/hours',
      hours: {},
      actitvity: ['Development', 'Testing', 'Meeting', 'Support', 'Research', 'Others'],
      showHideDialog:false,
      taskNames: [],
      employeeId:null,
      projectId:null,
      // task:{}
    }
  },
  computed: {
    fields () {
   return [{
        type: 'select',
        label: 'User name',
        property: 'name',
        col: 6,
        items: [],
        text: 'name',
        show: true,
        rules: this.emptyField
      },
      {
        type: 'select',
        label: 'Project Name',
        property: 'projectName',
        col: 6,
        items: [],
        text: 'name',
        rules: this.emptyField,
        show: true
      }]
    },
    logTimefields() {
    return [{
    type: 'select',
    label: 'Task',
    property: 'task',
    col: 6,
    items: [],
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
}
  },
  mixins: [action],
  methods: {
    getEmployeeRecords () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.employeeRecords = employeeDetails
        this.fields.forEach((records) => {
          if (records.property === 'name') records.items = employeeDetails
        })
      })
    }, 
    getProjectRecords () {
      this.fetchDetails(this.projectURL).then((projectDetails) => {
      this.projectRecords = projectDetails
      })
    },  
    getTaskRecords () {
      this.fetchDetails(this.taskURL).then((taskDetails) => {
      this.taskRecords = taskDetails
      })
    },
    reciveNames () {
      this.$root.$on('names', (data) => {
      let records = {employee: {}, task: []}
      records.employee = this.employeeRecords.find(employee => employee.name === data)
      records.task = this.taskRecords.filter(task => task.employeeId === records.employee.id)
      let arr=[]
      records.task.forEach((aaa)=>{
      records.project = this.projectRecords.find(project => project.id === aaa.projectId)
      arr.push(records.project)
       })
      this.fields.forEach((records) => {
        if (records.property === 'projectName') records.items = arr
      })
    })
    },
    hideDialog (dialog) {
      this.showHideDialog = dialog
    },
     getTask (hours) {
        const  records = {employee: {}, project:{}}
        records.employee = this.employeeRecords.find(employee => employee.name === hours.name)
        hours.employeeId = records.employee.id
        this.employeeId = records.employee.id
        records.project = this.projectRecords.find(project => project.name === hours.projectName)
        hours.projectId = records.project.id
        this.projectId = records.project.id
        this.taskNames = this.taskRecords.filter((task) => task.employeeId === hours.employeeId && task.projectId === hours.projectId)
        this.hideDialog()
        if (this.taskNames.length) {
         this.showHideDialog= true
         this.logTimefields.forEach((records) => {
        if (records.property === 'task') records.items = this.taskNames
        })
      } else {
        this.$root.$emit('snackBar', { text: 'No Task Found', color: 'error', snackBar: true })
        this.showHideDialog= false
      }
    }, 
    saveUpdateHour (hours) {
        hours.hour = Number(hours.hour)
        const taskName =  this.taskRecords.find(task => task.name === hours.task)
        hours.employeeId = this.employeeId
        hours.projectId = this.projectId
        hours.taskId = taskName.id
        this.editDetails(this.taskURL, hours.taskId).then((respose) => {
        this.task = respose.data
        this.task.spendTime += hours.hour

        console.log(this.task)

        const updateDetails = this.task
        this.updateDetails(this.taskURL, hours.taskId, updateDetails).then(() => {})
      })
        this.hideDialog()
        if (hours.id === this.$route.params.id) {
          this.saveDetails(this.hoursURL, hours).then(() => {
          this.$root.$emit('snackBar', { text: 'Hour Added', color: 'green darken-1', snackBar: true })
          //this.task.spendTime = 0
          //this.hours = {}
          // this.$router.push('/viewHours')
        })
      } else {
        //  this.editDetails(this.taskURL, this.hours.taskId).then((respose) => {
        //   this.task = respose.data
        //   if (this.hourToupdate < this.hours.hour) {
        //     this.task.spendTime += this.hours.hour
        //   } else if (this.hourToupdate === this.hours.hour) {
        //     this.task.spendTime = this.task.spendTime
        //   } else this.task.spendTime -= this.hours.hour
        //   const updateDetails = this.task
        //   this.updateDetails(this.taskURL, this.hours.taskId, updateDetails).then(() => {})
        // })
        this.updateDetails(this.hoursURL, this.$route.params.id, hours).then(() => {
          this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'light-blue darken-3', snackBar: true })
          this.$router.push('/viewHours')
        })
      }
    }, 
      async editHours () {
      const fetchRecord = await this.editDetails(this.hoursURL, this.$route.params.id)
      console.log(fetchRecord.data)
      if (fetchRecord.data) {
      //  const employeeName= this.employeeRecords.find(employee => employee.id === fetchRecord.data.employeeId)
      //  console.log(employeeName.name)
        this.hourToupdate = fetchRecord.data.hour
        this.$root.$emit('details', fetchRecord.data)
      }
    }
  },
  mounted () {
    this.getEmployeeRecords()
    this.reciveNames()
    this.getTaskRecords() 
    this. getProjectRecords ()
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
