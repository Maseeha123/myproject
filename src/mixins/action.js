import axios from 'axios'
export default {
  computed: {
    nameValidate () {
      return [v => !!v || 'Required Field',
        v => /^[A-Za-z. ]{3,}$/.test(v) || 'name must be valid']
    },
    emailValidate () {
      return [
        v => !!v || 'Required Field',
        v => /^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(v) || 'email  must be valid'
      ]
    },
    phoneValidate () {
      return [
        v => !!v || 'Required Field',
        v => /^[0-9]{10}$/.test(v) || 'Phone must be valid'
      ]
    },
    lastNameValidate () {
      return [
        v => !!v || 'Required Field',
        v => /^[A-Za-z]{1,2}$/.test(v) || 'Last Name must be valid'
      ]
    },
    emptyField () {
      return [
        v => !!v || 'Required Field'
      ]
    }
  },
  methods: {
    saveDetails (url, saveDetails) {
      return axios.post(`${url}.json`, saveDetails)
    },
    updateDetails (url, id, valueToUpdate) {
      return axios.put(`${url}/${id}.json`, valueToUpdate)
    },
    fetchDetails (url) {
      return axios.get(`${url}.json`).then((fetchDetails) => {
        const records = []
        for (var i in fetchDetails.data) {
          fetchDetails.data[i].id = i
          records.push(fetchDetails.data[i])
        }
        return records
      })
    },
    editDetails (url, id) {
      return axios.get(`${url}/${id}.json`)
    },
    deleteDetails (url, id) {
      return axios.delete(`${url}/${id}.json`).then(response => {
        if (response) this.$root.$emit('deleteSucess')
      })
    },
    saveUpdate (url, value, id) {
      if (id) return axios.put(`${url}/${id}.json`, value)
      else return axios.post(`${url}.json`, value)
    }
  }
}
