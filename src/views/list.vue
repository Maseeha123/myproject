<template>
    <v-app>
    <v-alert color='success' dense elevation="4" text  outlined>
        <v-icon>mdi-account</v-icon>
        This is a alert Box
    </v-alert>
    <v-alert color="blue" icon="mdi-account" outlined text type="success" dismissible></v-alert>
    <v-btn color="error"><v-hover class='primary'></v-hover></v-btn>
    <v-hover></v-hover>
     <v-row
    align="center"
    justify="center"
  >
    <v-col cols="12">
      <v-hover
      v-slot="{ hover }"
      >
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="my-4 text-center text-h6">
            Hover over me!
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
   <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-hover
        v-slot="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Open Delay (Mouse enter)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      sm="6"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Close Delay (Mouse leave)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <!-- <v-tooltip>
    <template v-slot:activator="{on,attrs}">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">Button</v-btn>
    </template>
<span>Tooltip</span>
  </v-tooltip> -->
  <v-tooltip bottom>
    <template v-slot:activator="{on, attrs}">
      <v-btn color="error"  v-bind="attrs" dark v-on="on"></v-btn>
    </template>
    <span>Home</span>
</v-tooltip>
</v-app>
</template>
<script>
/* eslint-disabled */
export default {
  data () {
    return {
      hover: true
    }
  }
}
</script>
