<template>
  <div>
    <div>
      <v-form ref="form" lazy-validation  v-model="valid" class="space">
        <v-container class="textalign">
          <v-row justify="center">
            <template v-for="(fields,formIndex) in  formFields">
              <v-col :cols="fields.col" v-if="fields.type=='text'" :key="`textfield_${formIndex}`">
              <v-text-field hide-details  :label="fields.label"   :rules="fields.rules" v-model="records[fields.property]" outlined dense clearable></v-text-field>
              </v-col>
                <v-col :cols="fields.col" v-else-if="fields.type=='number'" :key="`number_${formIndex}`">
                <v-text-field :label="fields.label" hide-details  type='number'   outlined dense clearable v-model="records[fields.property]"></v-text-field>
               </v-col>
                <v-col :cols="fields.col" v-else-if="fields.type=='password'" :key="`password_${formIndex}`">
                <v-text-field :label="fields.label" hide-details  :rules="fields.rules"  outlined dense clearable v-model="records[fields.property]"></v-text-field>
              </v-col>
               <v-col :cols="fields.col" v-else-if="fields.type=='select'" :key="`select_${formIndex}`">
             <v-select :items="fields.items" hide-details  attach :item-text="fields.text" :multiple="fields.multiple" @change="fields.label === 'User name'?getvalues():false" :chips="fields.chips" :rules="fields.rules" clearable :label="fields.label"  v-model="records[fields.property]" dense outlined></v-select>
            </v-col>
            <v-col :cols="fields.col" v-else-if="fields.type=='checkbox'" :name="fields.name" :key="`checkbox_${formIndex}`">
             <v-checkbox  :label="fields.label" hide-details v-model="records[fields.property]" dense></v-checkbox>
            </v-col>
             <v-col :cols="fields.col" v-else-if="fields.type=='date'" :key="`date_${formIndex}`">
              <v-menu v-model="fields.menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
             <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="records[fields.property]"   hide-details :rules="fields.rules" :label="fields.label" clearable dense prepend-icon="mdi-calendar" readonly outlined v-bind="attrs" v-on="on"></v-text-field>
            </template>
             <v-date-picker hide-details v-model="records[fields.picker]" :allowed-dates="fields.allowedDates ? compareDates : allowAllDate"  @input="records[fields.property] = localMoment(records[fields.picker], 'YYYY-MM-DD').format('DD/MM/YYYY'); fields.menu = false"  color="green lighten-1"></v-date-picker>
            </v-menu>
            </v-col>
             <v-col :cols="fields.col"  v-else-if="fields.type=='textarea'" :key="`textarea_${formIndex}`">
              <v-textarea hide-details :label="fields.label" :rows="fields.rows" :rules="fields.rules" outlined dense clearable v-model="records[fields.property]"></v-textarea>
              </v-col>
               <!-- <v-col :cols="fields.col"  v-else-if="fields.type=='button'" :key="`button_${formIndex}`">
                <v-btn  color="success" class="float-left" @click="$emit('save',sendDetails())">{{fields.label}}</v-btn>
              </v-col> -->
            </template>
            <div v-if='buttons'>
          <v-btn :class="buttonClick===isButtonShow ? 'success ':'primary'" @click="$emit('save',sendDetails())"><v-icon dark left> mdi-check</v-icon>{{buttonClick===true ?'SAVE':'UPDATE'}}</v-btn>&nbsp;
          <v-btn color="error"   @click="reset ();$emit('hideDialog',false)"><v-icon dark left> mdi-cancel</v-icon>Cancel</v-btn>&nbsp;
          <v-btn  color="primary" @click="$emit('back')" v-if="cancel" dark><v-icon dark left> mdi-arrow-left</v-icon> Back</v-btn>
            </div>
          </v-row>
           <v-row>
             <v-col>
                <v-btn  color="success" class="float-left" v-if='taskButton' @click="$emit('save',sendDetails())">Get Tasks</v-btn>
              </v-col>
              </v-row>
          <br>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      valid: true,
      buttonClick: true,
      localMoment: moment,
      dialog: true,
      records: this.record
    }
  },
  props: {
    formFields: {
      type: [Array, String],
      required: true
    },
    isButtonShow: {
      type: Boolean
    },
    cancel: {
      type: Boolean
    },
    record: {
      type: Object
    },
    buttons: {
      type: Boolean
    },
    taskButton: {
      type: Boolean
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    sendDetails () {
      if (this.validate()) {
        return this.records
      }
    },
    reciveDetails () {
      this.$root.$on('details', (data) => {
        this.records = data
        this.buttonClick = false
      })
    },
    reset () {
      this.$refs.form.reset()
    },
    getvalues () {
      this.$root.$emit('names', this.records.name)
    },
    compareDates (value) {
      return value > moment(this.records.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },
    allowAllDate (val) {
      return val
    }
  },
  mounted () {
    this.reciveDetails()
  }
}
</script>
<style scoped>
 .space{
   margin-top:20px
 }
 .btnSpace{
   margin-left: 8px;
 }
</style>
