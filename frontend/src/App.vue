<template>
  <div id="app">
    <div class="header">
      <h1>MarkDownIt</h1>
      <p>Live Markdown Previewer</p>
    </div>
    
    <div class="main-content">
      <div class="editor-pane">
        <h3>Editor</h3>
        <textarea 
          v-model="markdownText" 
          @input="handleInput"
          placeholder="Type your markdown here..."
        ></textarea>
      </div>
      
      <div class="preview-pane">
        <h3>Preview</h3>
        <div v-html="renderedHtml"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      markdownText: '# Welcome to MarkDownIt\n\nStart typing to see the preview!',
      renderedHtml: ''
    };
  },
  methods: {
    async handleInput() {
      try {
        const response = await axios.post('/api/render', {
          markdown: this.markdownText
        });
        this.renderedHtml = response.data.data;
      } catch (err) {
        console.error('Render error:', err);
      }
    }
  },
  mounted() {
    this.handleInput();
  }
}
</script>

<style>
/* Skeleton UI - No premium styles yet */
#app {
  padding: 20px;
}
.main-content {
  display: flex;
  gap: 20px;
}
.editor-pane, .preview-pane {
  flex: 1;
}
textarea {
  width: 100%;
  height: 400px;
}
</style>
