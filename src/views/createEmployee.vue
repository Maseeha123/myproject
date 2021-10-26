<template>
  <div>
  <br>
  <v-card>
    <v-card-text>
     <app-formFields :formFields="fields" @save="saveUpdateEmployeeDetails" @back="backToEmployee" :cancel="cancelButton" :isButtonShow="isButtonShow">
     </app-formFields>
    </v-card-text>
  </v-card>
   </div>
</template>
<script>
import formFields from '../components/forms.vue'
export default {
  name: 'employee',
  data () {
    return {
      url: 'https://traineesapi.firebaseio.com/employee',
      isButtonShow: true,
      cancelButton: true,
      role: ['Developer', 'Tester'],
      value: []
    }
  },
  computed: {
    fields () {
      return [{
        type: 'text',
        label: 'First name',
        property: 'name',
        col: 6,
        rules: this.nameValidate
      },
      {
        type: 'text',
        label: 'Last Name',
        property: 'lastName',
        col: 6,
        rules: this.lastNameValidate
      },
      {
        type: 'text',
        label: 'Email',
        property: 'email',
        col: 6,
        rules: this.emailValidate
      }, {
        type: 'text',
        label: 'Job Title',
        property: 'jobTitle',
        col: 6,
        rules: this.nameValidate

      }, {
        type: 'text',
        label: 'Mobile',
        property: 'mobile',
        col: 6,
        rules: this.phoneValidate
      },
      {
        type: 'textarea',
        label: 'Address',
        property: 'address',
        col: 6,
        rows: 2,
        rules: this.nameValidate
      },
      {
        type: 'text',
        label: 'username',
        property: 'username',
        col: 6,
        rules: this.nameValidate
      },
      {
        type: 'text',
        label: 'password',
        property: 'password',
        col: 6,
        rules: this.emptyField
      },
      {
        type: 'select',
        label: 'Gropus',
        property: 'group',
        col: 6,
        rules: this.emptyField,
        items: ['.Net', 'PHP']
      },
      {
        type: 'select',
        label: 'Role',
        property: 'role',
        col: 6,
        rules: this.emptyField,
        items: ['Developer', 'Tester'],
        multiple: true,
        chips: true
      },
      {
        type: 'checkbox',
        label: 'Is Admin',
        property: 'admin',
        col: 12
      }]
    }
  },
  methods: {
    backToEmployee () {
      this.$router.push('/viewEmployee')
    },
    saveUpdateEmployeeDetails (employee) {
      if (employee) {
        if (!Object.prototype.hasOwnProperty.call(employee, 'admin')) {
          employee.admin = false
        }
        if (employee.id === this.$route.params.id) {
          this.saveDetails(this.url, employee).then(() => {
            this.$root.$emit('snackBar', { text: 'Employee Added', color: 'green darken-1', snackBar: true })
            this.backToEmployee()
          })
        } else {
          this.updateDetails(this.url, this.$route.params.id, employee).then(() => {
            this.$root.$emit('snackBar', { text: 'Successfull updation', color: 'light-blue darken-3', snackBar: true, time: 1 })
            this.$router.push('/viewProfile/')
            this.backToEmployee()
          })
        }
      }
    },
    async editEmployee () {
      const fetchRecord = await this.editDetails(this.url, this.$route.params.id)
      if (fetchRecord.data) {
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
      }
    }
  },
  mounted () {
    this.editEmployee()
  },
  components: {
    'app-formFields': formFields
  }
}
</script>
<style scoped>
.tableDown{
 margin-top:10px
}
</style>
