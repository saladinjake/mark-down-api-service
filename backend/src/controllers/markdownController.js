const { renderMarkdown } = require('../services/markdownService');

// @desc    Render markdown to HTML
// @route   POST /api/render
// @access  Public
exports.render = (req, res) => {
  try {
    const { markdown } = req.body;
    
    if (markdown === undefined) {
      return res.status(400).json({ success: false, error: 'Markdown content is required' });
    }
    
    const html = renderMarkdown(markdown);
    
    res.status(200).json({ success: true, data: html });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
