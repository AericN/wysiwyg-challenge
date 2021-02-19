<template>
  <v-row>
    <v-col>
      <!-- Toolbar and Editor -->
      <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <v-icon>mdi-format-bold</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon>mdi-format-italic</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
              <v-icon>mdi-format-strikethrough</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <v-icon>mdi-format-underline</v-icon>
            </button>

            <button class="menubar__button" @click="commands.undo">
              <v-icon>mdi-undo</v-icon>
            </button>

            <button class="menubar__button" @click="commands.redo">
              <v-icon>mdi-redo</v-icon>
            </button>
          </div>
        </editor-menu-bar>
        <editor-content class="editor__content" :editor="editor" />
      </div>

      <!-- Buttons -->
      <div class="actions">
        <button class="button" @click="clearContent">
          Clear Content
        </button>
        <button class="button" @click="save">
          Save Template
        </button>
      </div>

      <div class="export">
        <h3>HTML</h3>
        <pre><code>{{ html }}</code></pre>
      </div>

      <div>
          {{variables}}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Italic, Strike, Underline, History } from 'tiptap-extensions'
import { Bus } from '../main'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    templates: Object,
    selectedTemplate: String,
    variables: Object
  },
  data() {
    return {
      editor: new Editor({
        extensions: [new Bold(), new Italic(), new Strike(), new Underline(), new History()],
        content: `
          <p>
            Enter text here or load a template
          </p>
          <p>
            You are also able to create templates and dynamic variables.
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.html = getHTML()
        }
      }),
      html: 'Update content to see changes'
    }
  },
  created() {
    Bus.$on('loadTemplate', name => {
      this.setContent(name)
    }),
    Bus.$on('loadVariable', name => {
        console.log(this.variables[name])
    })
  },
  methods: {
    clearContent() {
      this.editor.clearContent(true)
      this.editor.focus()
    },
    save() {
      let name = prompt('Enter Template Name:')
      if (name == null || name == '') {
        alert('Please Enter a valid Template name')
        return
      }
      this.templates[name] = this.html
      localStorage.templates = JSON.stringify(this.templates)
      this.$emit('savedTemplate')
    },
    setContent(name) {
      this.editor.setContent(this.templates[name], true)
      this.editor.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  max-width: 30rem;
  margin: 0 auto 2rem auto;
}
.button {
  font-weight: bold;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: black;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(black, 0.1);

  &:hover {
    background-color: rgba(black, 0.15);
  }
}
.export {
  max-width: 30rem;
  margin: 0 auto 2rem auto;
  pre {
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(black, 0.05);
    color: rgba(black, 0.8);
  }
  code {
    display: block;
    white-space: pre-wrap;
  }
}
.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(black, 0.05);
    }

    &.is-active {
      background-color: rgba(black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 1rem auto;

  &__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    background-color: rgba(black, 0.05);

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: black;
      color: white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
</style>
