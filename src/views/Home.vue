<template>
  <v-row>
    <!-- Editor Section -->
    <v-col cols="6">
      <h1 class="text-center">Editor</h1>
      <h3 class="text-center">This editor uses 'Tiptap' to power it</h3>
      <v-card class="mt-6 mx-2">
        <editor
          :templates="templates"
          :selectedTemplate="selectedTemplate"
          :variables="variables"
          @savedTemplate="loadTemplates"
        ></editor>
      </v-card>
    </v-col>

    <!-- Templates Section -->
    <v-col cols="6">
      <h1 class="text-center">Templates</h1>
      <h3 class="text-center">These templates are stored in localstorage</h3>
      <v-card class="list my-3 mx-2">
        <templates :templates="templates"></templates>
      </v-card>

      <!-- Variables Section -->
      <h1 class="text-center">Variables</h1>
      <h3 class="text-center">These variables represent dynamic content</h3>
      <v-card class="list my-3 mx-2">
        <variables :variables="variables" @savedVariable="loadVariables"></variables>
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
  },
  data: () => ({
    templates: {},
    variables: {},
    selectedTemplate: null
  }),
  mounted() {
    if (localStorage.templates) {
      this.loadTemplates()
    } else {
      // This instantiates templates in localstorage
      localStorage.templates = JSON.stringify(this.templates)
    }

    if (localStorage.variables) {
      this.loadVariables()
    } else {
      // This instantiates variables in localstorage
      localStorage.variables = JSON.stringify(this.variables)
    }
  },
  methods: {
    loadTemplates() {
      this.templates = JSON.parse(localStorage.templates)
      console.log('templates loaded')
    },
    loadVariables() {
      this.variables = JSON.parse(localStorage.variables)
      console.log('variables loaded')
    }
  }
}
</script>

<style scoped>
.list {
  height: 20rem;
}
</style>
