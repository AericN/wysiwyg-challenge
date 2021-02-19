<template>
  <v-container fluid>
    <!-- New variable input -->
    <v-row>
      <v-text-field label="Name" v-model="name" class="ml-3"></v-text-field>
      <v-text-field label="Dynamic Value" v-model="value" class="ml-2"></v-text-field>
      <v-btn class="mt-4 mx-3" :disabled="invalidInput" small @click="addVariable">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <!-- Variable list -->
    <div class="list mt-2">
      <v-row>
        <v-col cols="6" class="pl-4">
          Name
        </v-col>
        <v-col cols="6" class="pl-0">
          Value
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
      <div
        v-for="(variable, name, index) in variables"
        :key="index"
        class="list-item"
        tabindex="index"
        @click="updateSelected(name)"
      >
        <v-row dense>
          <v-col cols="6" class="pa-0 pl-1">{{ name }}</v-col>
          <v-col cols="6" class="pa-0">{{ variable }}</v-col>
        </v-row>
      </div>
    </div>

    <!-- Load button and selected variable name -->
    <v-row class="mt-1">
      <v-col>
        <v-btn @click="loadVariable" :disabled="!validVariableSelection" small>Load Variable</v-btn>
        <div class="d-inline ml-3">{{ selectedVariable }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bus } from '../main'

export default {
  data: () => ({
    name: '',
    value: '',
    selectedVariable: '',
    validVariableSelection: false
  }),
  props: {
    variables: Object
  },
  methods: {
    loadVariable() {
      Bus.$emit('loadVariable', this.selectedVariable)
      this.selectedVariable = ''
      this.validTemplateSelection = false
    },
    updateSelected(name) {
      this.selectedVariable = name
      if (this.selectedVariable != '') {
        this.validVariableSelection = true
        console.log(`selected variable ${this.selectedVariable}`)
      }
    },
    addVariable() {
      this.variables[this.name] = this.value
      localStorage.variables = JSON.stringify(this.variables)
      this.$emit('savedVariable')
    }
  },
  computed: {
    invalidInput() {
      if (this.name == '' || this.value == '') {
        return true
      } else {
          return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 1px solid lightgray;
  height: 12.5rem;
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
.namespan {
  width: 100px !important;
}
.valuespan {
  width: 60%;
}
</style>
