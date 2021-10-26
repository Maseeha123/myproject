<template>
    <div>
      <v-card>
    <v-card-title>
      <v-btn color="primary" small :disabled="disableButton" v-if="addButton" dark @click="$emit('add')">new</v-btn>
      &nbsp;&nbsp;
      <!-- <v-icon v-if="selected.length"  color="error" @click="$emit('deleteItems',selected)">mdi-delete</v-icon> -->
      <v-btn  v-if="selected.length"   class="red--text white" elevation="0" ><v-icon  @click="$emit('deleteItems',selected)">mdi-delete</v-icon>Delete</v-btn>
     <v-spacer></v-spacer>
     <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" single-line hide-details></v-text-field>
   </v-card-title>
   <v-data-table :headers="tableHeader" v-model="selected" :single-select="singleSelect" :show-select="$store.state.userDetails.admin === true ? true:false"   :items="tableBody" :items-per-page="10"  class="elevation-4" :search="search" :loading="myloadingvariable" loading-text="Loading... Please wait"  :sort-by="['name']" :sort-desc="[false, true]" multi-sort>
      <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2 " color="success"  @click="$emit('edit',item.id)">mdi-pencil</v-icon>
      <v-icon small color="error"  @click="$emit('delete',item.id)">mdi-delete</v-icon>
    </template>
       <template v-slot:[`item.task`]="{ item }">
      <v-icon small class="mr-2 " color="orange darken-3"  @click="$emit('logTime',item.id)">mdi-checkbox-marked-circle</v-icon>
    </template>
    <template v-slot:[`item.priority`]="{ item }">
      <v-chip class="text-center ma-2"  :color="getColor(item.priority)"  dark>
         {{ item.priority }}
      </v-chip>
    </template>
    <template v-slot:[`item.name`]="{ item }">
          <a  @click="$emit('edit',item.id)">
          {{ item.name | capitalize }}
        </a>
    </template>
      <template v-slot:[`item.lastName`]="{ item }">
          {{ item.lastName | initial  }}
    </template>
  </v-data-table>
  </v-card>
 </div>
</template>
<script>
export default {
  name: 'renderTable',
  data () {
    return {
      search: '',
      myloadingvariable: true,
      singleSelect: false,
      selected: [],
      remove: 'Delete'
    }
  },
  methods: {
    stoploding () {
      setTimeout(() => {
        this.myloadingvariable = false
      }, 1000)
    },
    editItem (id) {
      console.log(id)
    },
    getColor (priority) {
      if (priority === 'Immediate') return 'red'
      else if (priority === 'High') return 'orange'
      else return 'orange'
    }
  },
  mounted () {
    this.stoploding()
  },
  props: {
    tableHeader: {
      type: [Array, String],
      required: true
    },
    tableBody: {
      type: [Array, String]
    },
    showTable: {
      type: Boolean
    },
    isEditable: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    addButton: {
      type: Boolean
    },
    disableButton: {
      type: Boolean
    }
  }
}
</script>
<style>

</style>
