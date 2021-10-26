<template>
  <div>
    <renderTable :tableHeader="employeeTableHeader" @deleteItems="getRecords" @edit="editProject" :loading="isloading" :addButton="addButton" :tableBody="projectTableBody" :disableButton="disableButton" :showTable="showTable" @add="goToProject" isEditable:isEditable  />
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
export default {
  name: 'project',
  data () {
    return {
      projectTableBody: [],
      showTable: true,
      isEditable: true,
      url: 'https://traineesapi.firebaseio.com/project',
      employeeURL: 'https://traineesapi.firebaseio.com/employee',
      id: null,
      employeeTableHeader: [{
        text: 'Project Name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Domain',
        value: 'domain'
      },
      {
        text: 'Description',
        value: 'description'
      },
      {
        text: 'Memebers',
        value: 'membersNames'
      },
      {
        text: 'Start Date',
        value: 'startDate'
      },
      {
        text: 'End Date',
        value: 'endDate'
      }],
      isloading: false,
      addButton: true,
      dialogDelete: false,
      deleteRecords: [],
    }
  },
  components: {
    renderTable
  },
  mounted () {
    this.fetchProjectDetails()
    this.$root.$on('deleteSucess', () => {
      this.fetchProjectDetails()
    })
  },
  beforeDestroy () {
    this.$root.$off('deleteSucess')
  },
  methods: {
    async  fetchProjectDetails () {
    const projectDetails = await this.fetchDetails(this.url)
     const employeeDetails = await this.fetchDetails(this.employeeURL)
     projectDetails.forEach((project)=>{
       const names = []
        project.members.forEach((getNames)=>{
          const employeeName = employeeDetails.find(employee => employee.id === getNames) 
          if(employeeName){
          names.push(employeeName.name)
          project.membersNames = names 
         }
        })
     })
        this.isloading = true
        this.projectTableBody = projectDetails

    },
    editProject (id) {
      this.$router.push(`/project/${id}/task`)
    },
    goToProject () {
      this.$router.push('/project/new')
    },
    deleteItems () {
      this.deleteRecords.forEach((item) => {
        this.deleteDetails(this.url, item.id)
      })
      this.dialogDelete = false
    },
    closeDelete () {
      this.dialogDelete = false
    },
    getRecords (item) {
      this.dialogDelete = true
      this.deleteRecords = item
    }
  },
  computed: {
    disableButton () {
      if (this.$store.state.userDetails.admin) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
</style>
