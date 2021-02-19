<template>
  <v-container fluid>
    <!-- Template list -->
    <div class="list">
      <div
        v-for="(template, name, index) in templates"
        :key="index"
        class="list-item"
        tabindex="index"
        @click="updateSelected(name)"
      >
        {{ name }}
      </div>
    </div>

    <!-- Load button and selected template name -->
    <v-row class="mt-1">
      <v-col>
        <v-btn @click="loadTemplate" :disabled="!validTemplateSelection" small color="#2196F3">
          Load Template
        </v-btn>
        <v-btn
          @click="removeTemplate"
          :disabled="!validTemplateSelection"
          small
          class="ml-1"
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div class="d-inline ml-3">{{ selectedTemplate }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bus } from '../main'

export default {
  data: () => ({
    selectedTemplate: '',
    validTemplateSelection: false
  }),
  props: {
    templates: Object
  },
  methods: {
    loadTemplate() {
      Bus.$emit('loadTemplate', this.selectedTemplate)
      this.selectedTemplate = ''
      this.validTemplateSelection = false
    },
    updateSelected(name) {
      this.selectedTemplate = name
      if (this.selectedTemplate != '') {
        this.validTemplateSelection = true
      }
    },
    removeTemplate() {
      delete this.templates[this.selectedTemplate]
      localStorage.templates = JSON.stringify(this.templates)
      this.clearData()
      this.$emit('savedTemplate')
      Bus.$emit('clearEditor')
    },
    clearData() {
        this.selectedTemplate = '',
        this.validTemplateSelection = false
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 1px solid lightgray;
  height: 15.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
.list-item {
  display: block;
  padding-left: 3px;
}
.list-item:hover {
  background-color: #2196f3;
  color: white;
}
div:focus {
  background-color: #2196f3;
}
</style>
