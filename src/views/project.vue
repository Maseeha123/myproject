<template>
  <div>
    <v-card>
      <app-formFields :formFields="fields" @save="saveUpdateProject" @back="backToProject" :cancel="cancelButton" :isButtonShow="isButtonShow"></app-formFields>
    </v-card>
  </div>
</template>
<script>
import formFields from '../components/forms.vue'
export default {
  data () {
    return {
      url: 'https://traineesapi.firebaseio.com/project',
      isButtonShow: true,
      cancelButton: true
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
      // fetchRecord.data = {}
      if (fetchRecord.data) {
        this.$root.$emit('details', fetchRecord.data)
        this.isButtonShow = false
      }
    },
    backToProject () {
      this.$router.push('/viewProject')
    },
    showForm () {
      this.showProjectForm = true
    }
  },
  mounted () {
    this.editProject()
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
    margin-left: 10px;
     float: right;
     margin-right: 10px;
     position: relative;
     margin-top: 2px;
}
.moveRightside{
  float:right;
}
</style>
