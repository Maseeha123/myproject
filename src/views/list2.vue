<template>
  <v-app>
    <!-- <v-row v-for="(item, index) in list" :key="index" no-gutters>
      <v-col cols="12">
        <v-card class="mt-2 rounded-xl" hover>
          <v-card-title v-if="index === 0">
           <v-row class="ml-1 mt-1">
               <v-avatar size="60" color='primary'>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg">
             </v-img>
               </v-avatar>
              <div class="ml-1">{{item.text}}</div>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="pb-5 mt-3">
            <v-row class="ml-1 mt-1 text--primary">
              <v-icon>{{item.title}}</v-icon>
              <div class="ml-1 text-button">{{item.text}}</div>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
             <v-hover v-slot:default="{ hover }">
             <div class="ml-7">
              <tr>
            <v-simple-table  dense v-for="(item1, index1) in item.tableValue" :key="index1">
              <tr width=60%>
                <th>{{item1.label}}</th><td>{{item1.value}}</td><td>
                  <v-text-field label="Theme Color1" ref="file" style="display:show"  outlined hide-details class="ma-0 pa-0" readonly   dense></v-text-field>
                </td>
              <v-expand-transition>
                <v-layout justify-end v-if="hover">
                <v-fade-transition>
                <td><v-btn text x-small icon color="info"><v-icon x-small color="error" @click="item1.click()">{{item1.icon}}</v-icon></v-btn></td>
                   </v-fade-transition>
                </v-layout>
             </v-expand-transition>
              </tr>
            </v-simple-table>
              </tr>
             </div>
             </v-hover>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
     <!-- <v-expand-transition>
          <v-layout justify-end>
            <v-fade-transition>
              <v-btn text x-small icon color="info"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-fade-transition>
            <v-fade-transition>
              <v-btn text x-small icon color="error"><v-icon>mdi-window-close</v-icon></v-btn>
            </v-fade-transition>
          </v-layout>
        </v-expand-transition> -->
        <!-- <v-text-field label="Theme Color1" ref="file"   outlined hide-details class="ma-0 pa-0" readonly   dense></v-text-field>
           <v-text-field label="Theme Color2" ref="file2" style="display:none" outlined hide-details class="ma-0 pa-0" readonly   dense></v-text-field>
              <v-text-field label="Theme Color3" ref="file3" style="display:none"  outlined hide-details class="ma-0 pa-0" readonly  dense></v-text-field> -->
    <!-- <v-carousel>
      <v-carousel-item v-for="(item,index) in color" :key="index">
        <v-card :color="item" width="500" height="100">
          {{item}}
        </v-card>
        <p>{{index}}</p>
      </v-carousel-item>
      </v-carousel> -->
      <!-- <v-flex>
  <v-carousel hide-delimiters style="box-shadow: 0px 0px">
    <v-carousel-item v-for="i in 2" :key="i">
      <v-layout row>
        <v-flex sm4 v-for="j in 6" :key="j" pl-2 pr-2>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Card {{i}}-{{j}}</h3>
                <div> Card text </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</v-flex> -->
<!-- <v-flex>
  <v-carousel hide-delimiters style="box-shadow: 0px 0px" prev-icon>
    <v-carousel-item v-for="i in 2" :key="i">
      <v-layout row>
        <v-flex sm4 v-for="j in color" :key="j" pl-2 pr-2>
          <v-card :color="j">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Card {{i}}-{{j}}</h3>
                <div> Card text </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</v-flex> -->
<!-- <v-carousel prev-icon>
  <template v-for="(item, index) in slider">
    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
      <v-row class="flex-nowrap" style="height:100%" no-gutters>
        <template v-for="(n,i) in columns">
          <template v-if="(index + i) < slider.length">
            <v-col :key="i">
              <v-card height="70" width="200">
                <v-card-text>{{+index + i + 1}}</v-card-text>
              </v-card>
            </v-col>
          </template>
        </template>
      </v-row>
    </v-carousel-item>
  </template>
</v-carousel> -->
<!-- <v-carousel hide-delimiters prev-icon>
  <template v-for="(item, index) in slider">
    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
      <v-row class="flex-nowrap" style="height:100%">
        <template v-for="(n,i) in columns">
          <template v-if="(+index + i) < slider.length">
            <v-col :key="i">
              <v-sheet v-if="(+index + i) < slider.length" :color="slider[+index + i]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">{{+index + i + 1}}</div>
                </v-row>
              </v-sheet>
            </v-col>
          </template>
        </template>
      </v-row>
    </v-carousel-item>
  </template>
</v-carousel> -->
<!-- <template>
   <v-container>
      <v-row class="text-center">
         <v-col cols="12">
           <v-carousel v-model="model" prev-icon hide-delimiters>
               <v-carousel-item>
                 <v-sheet color="primary" height="100%">
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="4">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 1
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="4">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 2
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="4">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 3
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-carousel-item>
               <v-carousel-item>
                  <v-sheet color="amber darken-2" height="100%">
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="6">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 4
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="6">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 5
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-carousel-item>
            </v-carousel>
         </v-col>
      </v-row>
   </v-container>
</template> -->
   <!-- <v-container>
      <v-row>
         <v-col cols="4" v-for="(item, index) in  listOfAllowedFeatures" :key="index">
           <v-carousel v-model="model" prev-icon hide-delimiters>
               <v-carousel-item>
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="4">
                              <v-card min-height="300">
                                 <v-card-title>
                                    {{item.id}}
                                 </v-card-title>
                                 <v-card-text>
                                    {{item.model}}
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
               </v-carousel-item>
               <v-carousel-item v-if="index > 2">
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="4">
                              <v-card min-height="300">
                                 <v-card-title>
                                    {{item.id}}
                                 </v-card-title>
                                 <v-card-text>
                                    {{item.model}}
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
               </v-carousel-item>
            </v-carousel>
         </v-col>
      </v-row>
   </v-container> -->
       <!-- <v-row>
    <v-col cols="12"> -->
    <!-- <v-carousel hide-delimiters prev-icon  height="100" width="500">
    <template v-for="(item, index) in slider">
      <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
        <v-row class="flex-nowrap" style="height:100%">
          <template v-for="(n,i) in columns">
            <template v-if="(+index + i) < slider.length">
              <v-col :key="i">
                <v-sheet v-if="(+index + i) < slider.length" :color="slider[+index + i]" width="150" height="30%">
                </v-sheet>
              </v-col>
            </template>
          </template>
        </v-row>
      </v-carousel-item>
    </template>
  </v-carousel> -->
    <!-- </v-col>
  </v-row> -->
<!-- <div style="width:700px;height:10px">
        <v-carousel hide-delimiters prev-icon height="120px">
        <template v-for="(item, index) in slider">
          <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
            <v-row class="flex-nowrap" style="height:100%">
              <template v-for="(n,i) in columns">
                <template v-if="(+index + i) < slider.length">
                  <v-col :key="i">
                    <v-sheet v-if="(+index + i) < slider.length" :color="slider[+index + i]"  height="130%">
                      <v-row class="fill-height" align="center" justify="center">
                        <div class="display-3">{{+index + i + 1}}</div>
                      </v-row>
                    </v-sheet>
                  </v-col>
                  </template>
              </template>
            </v-row>
          </v-carousel-item>
        </template>
      </v-carousel>
     </div> -->
      <div style="width:500px;height:10px">
        <v-carousel hide-delimiters prev-icon height="120px">
        <template v-for="(item, index) in slider">
          <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
            <v-row class="flex-nowrap" style="height:100%">
              <template v-for="(n,i) in columns">
                <template v-if="(+index + i) < slider.length">
                  <v-col :key="i">
                    <v-sheet v-if="(+index + i) < slider.length" :color="slider[+index + i]"  height="130%">
                      <v-row class="fill-height" align="center" justify="center">
                        <div class="display-3">{{+index + i + 1}}</div>
                      </v-row>
                    </v-sheet>
                    <!-- <v-card v-if="(+index + i) < slider.length"  height="130%">
                        <v-row class="fill-height" align="center" justify="center">
                        <div class="display-3">{{+index + i + 1}}</div>
                      </v-row>
                    </v-card> -->
                  </v-col>
                  </template>
              </template>
            </v-row>
          </v-carousel-item>
        </template>
  </v-carousel>
</div>
<br>
                          <!-- <v-flex>
                               <div style="width:500px;height:10px">
                                <v-carousel hide-delimiters prev-icon height="50px" >
                                    <v-layout row>
                                <template v-for="(item, index) in slider">
                                  <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                    <v-row class="flex-nowrap" style="height:100%">
                                      <template v-for="(n,i) in columns">
                                        <template v-if="(+index + i) < slider.length">
                                          <v-col :key="i">
                                            <v-card v-if="(+index + i) < slider.length"  height="50%">
                                                <v-row class="fill-height" align="center" justify="center">
                                                <div>{{+index + i + 1}}</div>
                                              </v-row>
                                            </v-card>
                                          </v-col>
                                          </template>
                                      </template>
                                    </v-row>
                                  </v-carousel-item>
                                </template>
                               </v-layout>
                              </v-carousel>
                          </div>
                        </v-flex> -->
                                <!-- <v-flex>
                                <v-carousel hide-delimiters prev-icon style="box-shadow: 0px 0px">
                                  <v-carousel-item v-for="i in 2" :key="i">
                                    <v-layout row>
                                      <v-flex sm4 v-for="j in 5" :key="j" pl-2 pr-2>
                                        <v-card>
                                          <v-img
                                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                            aspect-ratio="0.8"
                                          ></v-img>
                                          <v-card-title primary-title>
                                            <div>
                                              <h3 class="headline mb-0">Card {{i}}-{{j}}</h3>
                                              <div> Card text </div>
                                            </div>
                                          </v-card-title>
                                        </v-card>
                                      </v-flex>
                                    </v-layout>
                                  </v-carousel-item>
                                </v-carousel>
                              </v-flex> -->
 <!-- <template>
   <v-container>
      <v-row class="text-center">
         <v-col cols="7">
           <v-carousel v-model="model" prev-icon hide-delimiters height="100%">
               <v-carousel-item>
                 <v-sheet color="primary" width="650" height="100%">
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="4">
                              <v-card height="70" width="200" tile>
                                 <v-card-title>
                                    Card 1
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="4">
                              <v-card height="70" width="200" tile>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.  voluptas reprehenderit
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="4">
                              <v-card height="70" width="200" tile>
                                 <v-card-title>
                                    Card 3
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-carousel-item>
               <v-carousel-item>
                  <v-sheet color="amber darken-2" height="100%">
                     <v-container fill-height>
                        <v-row>
                           <v-col cols="6">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 4
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                           <v-col cols="6">
                              <v-card min-height="300">
                                 <v-card-title>
                                    Card 5
                                 </v-card-title>
                                 <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum reprehenderit aliquid dolorum rerum? Deserunt quis, saepe quibusdam suscipit non iusto voluptas reprehenderit voluptates odit, tempore, modi impedit iste! Molestias, consectetur.
                                 </v-card-text>
                              </v-card>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-carousel-item>
            </v-carousel>
         </v-col>
      </v-row>
   </v-container>
</template> -->
 </v-app>
</template>
<script>
/* eslint-disable */
export default{
  data(){
    return{
      color: ['red','orange','green','primary','error'],
        listOfAllowedFeatures: [
        { id: 5, model: 'Sales And Marketing', price: 0, selected: false},
        { id: 6, model: 'Checklist', price: 0, selected: false },
        // { id: 7, model: 'Booking', price: 0, selected: false, qTip: 'Provides option to manage booking with booking and portal' },
        { id: 10, model: 'Timer', price: 0, selected: false},
        { id: 11, model: 'Tickets', price: 0, selected: false},
        { id: 20, model: 'Tripletex Integration', price: 0, selected: false }
        // { id: 21, model: 'Docusign Integration', price: 0, selected: false, qTip: 'You can sync your tripletex records to our system' }
      ],
       slider: [
        "red", 
        "green", 
        "orange", 
        "blue", 
        "pink"
        // "purple", 
        // "indigo", 
        // "cyan", 
        // "deep-purple", 
        // "light-green", 
        // "deep-orange", 
        // "blue-grey"
      ]
      // selectedItem: 1,
      // list:[
      //   {name:'apple 4',title:'mdi-clock',text:'aaa',tableValue:[{label: "a file1", value: "secrets1",icon:"mdi-pencil",click: ()=> this.$refs.file.$refs.input.click()},
      //   {label: "a file2", value: "secrets2",icon:"mdi-pencil"},{label: "a file3", value: "secrets3",icon:"mdi-pencil"},{label: "a file4", value: "secrets4"} 
      //   ]
      //   },
      //    {name:'apple 4',title:'mdi-clock',text:'aaa',tableValue:[{label: "a file1", value: "secrets1"},
      //   {label: "a file2", value: "secrets2"},{label: "a file3", value: "secrets3"},{label: "a file4", value: "secrets4"}
      //   ]
      //   },
      //    {name:'apple 4',title:'mdi-clock',text:'aaa',tableValue:[{label: "a file1", value: "secrets1"},
      //   {label: "a file2", value: "secrets2"},{label: "a file3", value: "secrets3"},{label: "a file4", value: "secrets4"}
      //   ]
      //   },
      //    {name:'apple 4',title:'mdi-clock',text:'aaa',tableValue:[{label: "a file1", value: "secrets1"},
      //   {label: "a file2", value: "secrets2"},{label: "a file3", value: "secrets3"},{label: "a file4", value: "secrets4"}
      //   ]
      //   }
      //   ],
      //   sidebar: [
      //   {
      //     action: 'mdi-clock',
      //     title: 'All Items',
      //     click: 1
      //   },
      //   {
      //     action: 'mdi-send',
      //     title: 'At My Location',
      //     click: 2
      //   },
      //   {
      //     action: 'mdi-delete',
      //     title: 'In Storage',
      //     click: 3
      //   },
      //   {
      //     action: 'mdi-report',
      //     title: 'Processiong',
      //     click: 4
      //   }
      // ],
      // items: [
      //   { text: 'Real-Time', icon: 'mdi-clock' ,click: 1},
      //   { text: 'Audience', icon: 'mdi-account',click: 2 },
      //   { text: 'Conversions', icon: 'mdi-flag',click: 3 },
      // ]
   
      // list:[
      //   {name:'apple 4',title:'mdi-clock',text:'aaa',tableData:{tableValue:[{label: "a file2", value: "secrets2"},
      //   {label: "a file2", value: "secrets2"},{label: "a file2", value: "secrets2"},{label: "a file2", value: "secrets2"}
      //   ]
      //   }}]
  }
},
methods:{
    triggerClick: function (number){
          alert("Clicked!"+number);
        }
},
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 3;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 3;
      }

      return 1;
    }
  }
}
</script>
<style scoped>
th, td {
  padding: 9px;
}
  .box{ border:1px solid rgb(16, 55, 230); position:relative; margin-top:30px; }
.rightCircle{ position:absolute;width:20px; height:20px;color: rgb(16, 55, 230); border-radius:70%; right:-13px;top:-15px;}
.icon-text {
  font-size:15px;
  background-color:#4746f0;
  border-radius:20px;
  color:white;
}

</style>
