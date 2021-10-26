<template>
  <div>
    <renderTable :tableHeader="employeeTableHeader" @deleteItems="getRecords" @edit="editEmployee"  :addButton="addButton" :loading="isloading" :tableBody="employeeTableBody" :showTable="showTable" @add="goToEmployee" isEditable:isEditable class="alignTable" />
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
      employeeTableBody: [],
      showTable: true,
      isEditable: true,
      url: 'https://traineesapi.firebaseio.com/employee',
      id: null,
      employeeTableHeader: [{
        text: 'First Name',
        align: 'start',
        value: 'name'
      },
      {
        text: 'Last Name',
        value: 'lastName'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Address',
        value: 'address'
      },
      {
        text: 'Job Title',
        value: 'jobTitle'
      },
      {
        text: 'Mobile',
        value: 'mobile'
      },
      {
        text: 'User Name',
        value: 'username'
      },
      {
        text: 'Password',
        value: 'password'
      }
      ],
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
    this.fetchEmployeeDetails()
    this.$root.$on('deleteSucess', () => {
      this.fetchEmployeeDetails()
    })
  },
  beforeDestroy () {
    this.$root.$off('deleteSucess')
  },
  methods: {
    goToEmployee () {
      this.$router.push('/viewEmployee/createEmployee')
    },
    fetchEmployeeDetails () {
      this.fetchDetails(this.url).then((employeeDetails) => {
        this.employeeTableBody = employeeDetails
      })
    },
    editEmployee (id) {
      this.$router.push(`/viewEmployee/createEmployee/${id}`)
    },
    deleteItems () {
      if (this.deleteRecords.length) {
        this.deleteRecords.forEach((item) => {
          this.deleteDetails(this.url, item.id)
        })
        this.dialogDelete = false
      }
    },
    closeDelete () {
      this.dialogDelete = false
    },
    getRecords (item) {
      this.dialogDelete = true
      this.deleteRecords = item
    }
  },
  mixins: [action]
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
