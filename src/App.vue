<template>
  <v-app style="background-color: #fcfcfc">
    <app-header></app-header>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',

  components: {
    AppHeader: Header
  },

  data: () => ({
    //
  })
}
</script>
