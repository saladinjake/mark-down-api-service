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
        <div class="preview-content" v-html="renderedHtml"></div>
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

.editor-pane, .preview-pane {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.editor-pane h3, .preview-pane h3 {
  padding: 1.25rem 1.5rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

textarea {
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  outline: none;
}

.preview-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  color: #e2e8f0;
  line-height: 1.6;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
