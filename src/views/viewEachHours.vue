<template>
  <div>
    <renderTable :tableHeader="hoursTableHeader" @edit="editHour"  @delete="deleteHour" :loading="isloading" :tableBody="hoursTableBody" :showTable="showTable" isEditable:isEditable />
  </div>
</template>
<script>
import action from '../mixins/action'
import renderTable from '../components/table.vue'
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
        value: 'employeeName'
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
      }
      ],
      isloading: true
    }
  },
  components: {
    renderTable
  },
  mounted () {
    this.fetchHoursDetails()
  },
  computed: {
    ...mapGetters(['userDetails'])
  },
  methods: {
    fetchHoursDetails () {
      this.fetchDetails(this.url).then((hoursDetails) => {
        if (this.$store.state.userDetails.admin === true) {
          this.hoursTableBody = hoursDetails.filter(hours => hours.employeeId === this.$route.params.id)
        } else {
          this.hoursTableBody = hoursDetails.filter(hours => hours.employeeId === this.$store.state.userDetails.id)
        }
      })
    },
    async deleteHour (id) {
      await this.deleteDetails(this.url, id)
      this.fetchHoursDetails()
    },
    async editHour (id) {
      this.$router.push(`/hours/${id}`)
    },
    goToHours () {
      this.$router.push('/hours')
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
margin-top: 100px;
}
.alignCenter{
  text-align: center;
}
</style>
