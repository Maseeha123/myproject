<template>
  <v-app>
    <v-card>
      <formFields :formFields="fields" @save="saveUpdateProject" @back="backToProject" :cancel="true" :buttons="true" :record="records" :isButtonShow="isButtonShow"></formFields>
    </v-card>
  </v-app>
</template>
<script>
/* eslint-disable */
import formFields from '../../components/forms.vue'
export default {
  data () {
    return {
      url: 'https://traineesapi.firebaseio.com/project',
      isButtonShow: true,
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      records: {},
      list: [],
      employeeRecords: [],
      membersArray: []
    }
  },
  computed: {
    fields () {
      return [{
        type: 'text',
        label: 'Project name',
        property: 'name',
        col: 6,
        rules: this.nameValidate
      },
      {
        type: 'select',
        label: 'Domain',
        col: 6,
        items: ['PHP', 'Android', 'VUE JS', 'ASP.net'],
        property: 'domain',
        rules: this.emptyField
      },
      {
        type: 'date',
        label: 'Start Date',
        property: 'startDate',
        col: 6,
        picker: 'startPicker',
        rules: this.emptyField,
        menu: false
      },
      {
        type: 'date',
        label: 'Finished  Date',
        property: 'endDate',
        col: 6,
        menu: false,
        picker: 'endPicker',
        rules: this.emptyField,
        allowedDates: true
      },
      {
        type: 'select',
        label: 'Members',
        property: 'members',
        col: 6,
        rules: this.emptyField,
        items: this.list,
        multiple: true,
        chips: true
      },
      {
        type: 'textarea',
        label: 'Description',
        property: 'description',
        col: 12,
        rows: 2,
        rules: this.nameValidate
      }]
    }
  },
  methods: {
    saveUpdateProject (project) {
      project.members.forEach((member) =>{
      const getEmployeeId =  this.employeeRecords.find(employee => employee.name === member)
      this.membersArray.push(getEmployeeId.id)
      })
      project.members = this.membersArray
      if (project) {
        if (project.id === this.$route.params.id) {
          this.saveDetails(this.url, project).then(() => {
            this.$root.$emit('snackBar', { text: 'Project Added', color: 'green darken-1', snackBar: true })
            this.backToProject()
          })
        } else {
          this.updateDetails(this.url, this.$route.params.id, project).then(() => {
            this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'light-blue darken-3', snackBar: true })
            this.backToProject()
          })
        }
      }
    },
    async editProject () {
      const fetchRecord = await this.editDetails(this.url, this.$route.params.id)
      const employeeDetails = await this.fetchDetails(this.employeeURL)
      const list = []
      if (fetchRecord.data) {
        fetchRecord.data.members.forEach((member) =>{
            const getEmployeeName =  employeeDetails.find(employee => employee.id === member)
         list.push(getEmployeeName.name)
      })
        fetchRecord.data.members = list
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
      }
    },
    backToProject () {
      this.$router.push('/project')
    },
    showForm () {
      this.showProjectForm = true
    },
    fetchEmployeeDetails () {
      this.fetchDetails(this.employeeURL).then((employeeDetails) => {
        this.employeeRecords = employeeDetails
        employeeDetails.forEach((employee) => {
          this.list.push(employee.name)
        })
      })
    }
  },
  mounted () {
    this.editProject()
    this.fetchEmployeeDetails()
  },
  components: {
    formFields
  },
}
</script>
<style scoped>
</style>
