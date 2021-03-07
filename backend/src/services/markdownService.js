const marked = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Render Markdown to Sanitized HTML
 * @param {string} markdown 
 * @returns {string} html
 */
exports.renderMarkdown = (markdown) => {
  if (!markdown) return '';
  
  // Render markdown to HTML
  const rawHtml = marked(markdown);
  
  // Sanitize HTML
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  
  return cleanHtml;
};
