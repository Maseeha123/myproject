<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      >
      <v-stepper-step
        :complete="currentStep > 1" step="1" >
        Name of step 1
      </v-stepper-step>
      <v-divider></v-divider>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"></v-card>
          <v-btn
          color="primary"
          @click="currentStep = 2">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
        </template>
    </v-stepper-header>
  </v-stepper>
</template>
<script>
/* eslint-disable */
export default{
    data(){
        return{
               currentStep: 1,
               steps: [
              { id: 1, text: 'Basic Information' },
              { id: 2, text: 'Choose features & Integrations' },
              { id: 3, text: 'Pricing' }
      ],

        }
    }
}
</script>

