<template>
  <div>
    <renderTable :tableHeader="employeeTableHeader" @deleteItems="getRecords" @edit="editProject" :loading="isloading" :addButton="addButton" :tableBody="projectTableBody" :disableButton="disableButton" :showTable="showTable" @add="goToProject" isEditable:isEditable class="alignTable" />
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
export default {
  name: 'employee',
  data () {
    return {
      projectTableBody: [],
      showTable: true,
      isEditable: true,
      url: 'https://traineesapi.firebaseio.com/project',
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
        text: 'Start Date',
        value: 'startDate'
      },
      {
        text: 'End Date',
        value: 'endDate'
      }],
      isloading: true,
      addButton: true,
      dialogDelete: false,
      deleteRecords: []
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
    fetchProjectDetails () {
      this.fetchDetails(this.url).then((employeeDetails) => {
        this.projectTableBody = employeeDetails
      })
    },
    editProject (id) {
      this.$router.push(`/viewProject/viewTask/${id}`)
    },
    goToProject () {
      this.$router.push('/viewProject/project')
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
  mixins: [action],
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
