<template>
 <v-app>
<v-card>
   <!-- <v-row align="center">
        <v-col cols="12">{{values}}
                <v-autocomplete v-model="values" :items="list" item-text="name" outlined dense chips small-chips label="Outlined" multiple></v-autocomplete>
            </v-col>
            <v-col cols='12'>
              <v-autocomplete v-model='value' dense allow-overflow outlined label="Fruits" small-chips chips :items='list' item-text='name' multiple></v-autocomplete>{{value}}
            </v-col>
        </v-row> -->
        <v-row>
            <!-- <v-col cols='12'>
              <v-autocomplete v-model='values' search-input="abc" shaped single-line dense allow-overflow outlined label="Fruits" small-chips chips :items='list' item-text='name' multiple></v-autocomplete>{{value}}
            </v-col>
             <v-col cols='12'>
              <v-autocomplete v-model='value' type="text" color='success' counter='12' disable-lookup error-count='10' deletable-chips search-input="abc" solo shaped  dense allow-overflow outlined label="Fruits" small-chips chips :items='list' item-text='name' multiple></v-autocomplete>{{value}}
            {{value}}</v-col> -->
          <!-- <v-col cols="12">
            <v-autocomplete v-model='value' outlined multiple dense label='Select' allow-overflow :items='states' item-text='name' :filter="customFilter"></v-autocomplete>
          </v-col> -->
           <v-col cols="12" sm="4" md="4">
     <v-checkbox v-model="ex4" label="orange" color="orange" value="orange" hide-details></v-checkbox>{{ex4}}
     <v-checkbox v-model='ex4' error indeterminate-icon='$checkboxIndeterminate' off-icon='$checkboxOff' value='red' hint='hii' background-color="yellow"  label='red' append-icon='mdi-clock' small color='red' dense></v-checkbox>
          <v-checkbox v-model="ex4" color='orange' persistent-hint value="orange" off-icon="$checkboxOff"></v-checkbox>
           </v-col>
        </v-row>
<v-row>
  <v-col cols='9'>
   <v-container fluid>
    <v-row>
        <v-col cols="12">
            <v-combobox v-model="select" :items="items" label="Combobox" multiple outlined dense></v-combobox>
        </v-col>
    </v-row>
</v-container>
  </v-col>
</v-row>
 <v-container>
    <v-row>
      <v-col col="12">
        <v-combobox v-model="select" :items="items" label="Select activity" multiple chips>
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-container>
</v-card>
</v-app>
</template>

<script>
/* eslint-disable */
export default {
  data () {
     const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }
    return {
      hover: true,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: [],
      list:[{name:'apple'},{name:'mango'},{name:'graphs'},{name:'orange'},{name:'banana'}],
      value:[],
        states: [
          { name: 'Florida', abbr: 'FL', id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2 },
          { name: 'Nebraska', abbr: 'NE', id: 3 },
          { name: 'California', abbr: 'CA', id: 4 },
          { name: 'New York', abbr: 'NY', id: 5 },
        ],
         autoUpdate: true,
        friends: ['Sandra Adams', 'Britta Holt'],
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
          { header: 'Group 1' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          { divider: true },
          { header: 'Group 2' },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
        ],
        title: 'The summer breeze',
        ex4: [],
       select: ['Vuetify', 'Programming']
        
  }
  },
  methods:{
    customFilter(item,queryText,itemText){

        console.log(item)
        console.log(queryText)
        console.log(itemText)
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
    },
        async saveUpdateHandler () {

      if (this.$refs.configReference.validate()) {

        let model = this.$formatter.cloneVariable(this.systemConfigObj)

        this.$api.execute('post', `${this.MODULE}`, model).then(response => {

          this.$root.$emit('snackbar', { snackbar: true, color: 'success', text: model._id ? 'updateSuccess' : 'savedSuccess' })

          this.systemConfigObj = response.data

          this.$store.state.auth.userDetails.systemconfig = this.systemConfigObj

          this.updateAppUserCookie()

        })

        this.uploadProfile()

      } else this.$root.$emit('snackbar', { snackbar: true, color: 'error', text: 'validationIssue' })

    },
  }
}
</script>
