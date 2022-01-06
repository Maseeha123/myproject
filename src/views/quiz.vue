<template>
  <!-- <v-row>
   <v-col cols="12" class="pa-0">
    <v-card class="pl-3" height="300">
      <v-card-title class="pa-3 font-italic text-medium">{{quizQuestions[currentQuestion].question}}</v-card-title>
      <v-radio-group v-model="option"  dense row>
        <v-radio v-for="(fields, _index) in quizQuestions[currentQuestion].options" :key="_index" :label="fields" :value="fields"></v-radio>
      </v-radio-group>
      <v-row justify="end">
         <v-btn class="mr-6" color="primary" @click="nextQuestion(currentQuestion,option)">Next <v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-row>
    </v-card>
  </v-col>
  </v-row> -->
  <v-card :height="height" color="orange">
    ...
  </v-card>
</template>
<script>
/* eslint-disable */
export default {
    data() {
          return {
              quizQuestions: [
                  { 
                  question: '1. What are the advantages of using Vue.js?',
                  options: ['fast','reliable','simple','not Easy'],
                  correctAnswer: 'fast',
                  correctanswerScore: 1,
                  wrongAnswer: 0
                  },
                  { 
                  question: '2. If you use .passive and .prevent together, .prevent will be ignored. Probably, it will show you a warning.?',
                  options: ['true','false'],
                  correctAnswer: 'true',
                  correctanswerScore: 1,
                  wrongAnswer: 0
                  },
                  { 
                  question: '3.Which of the directives below provide a two-way binding?',
                  options: ['v-model','reliable','simple','not Easy'],
                  correctAnswer: 'v-model',
                  correctanswerScore: 1,
                  wrongAnswer: 0
                  },
                  { 
                  question: '4. Which of the following directives is to used for attaching event listeners that invoke methods?',
                  options: ['v-model','v-for','inline','not Easy'],
                  correctAnswer: 'v-for',
                  correctanswerScore: 1,
                  wrongAnswer: 0
                  }
                  ],
                  option: '',
                  currentQuestion:0,
                  total: 0
          }
    },
    methods:{
      nextQuestion(index, option) {
      
         if (this.quizQuestions[this.currentQuestion].correctAnswer === option) {
            this.total += this.quizQuestions[this.currentQuestion].correctanswerScore
            console.log(this.total)
         }  if( index === 3) {
            this.currentQuestion = index 
            } else
            this.currentQuestion = index + 1
         
         console.log(this.total);
        }
      },
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 300
        }
      },
    }
      
  
}
   
</script>