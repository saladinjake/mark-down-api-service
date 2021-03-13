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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

:root {
  --primary: #6366f1;
  --secondary: #4f46e5;
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --text-light: #f8fafc;
  --border-color: #334155;
}

body {
  margin: 0;
  background-color: var(--bg-dark);
  color: var(--text-light);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.header p {
  color: #94a3b8;
  font-size: 1.25rem;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 70vh;
}
</style>
