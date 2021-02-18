<template>
  <v-row>
    <!-- Editor Section -->
    <v-col cols="6">
      <h1 class="text-center">Editor</h1>
      <h3 class="text-center">This editor uses 'Tiptap' to power it</h3>
      <v-card class="mt-6 mx-2">
        <editor></editor>
      </v-card>
    </v-col>

    <!-- Templates and Variables Section -->
    <v-col cols="6">
      <h1 class="text-center">Templates</h1>
      <h3 class="text-center">These templates are stored in localstorage</h3>
      <v-card class="list my-3 mx-2">
        <templates></templates>
      </v-card>

      <h1 class="text-center">Variables</h1>
      <h3 class="text-center">These variables represent dynamic content</h3>
      <v-card class="list my-3 mx-2">
        <variables></variables>
      </v-card>
    </v-col>
    
  </v-row>
</template>

<script>
import Editor from '../components/Editor'
import Templates from '../components/Templates'
import Variables from '../components/Variables'
export default {
  components: {
    Editor,
    Templates,
    Variables
  }
}
</script>

<style scoped>
.list {
  height: 20rem;
}
</style>
