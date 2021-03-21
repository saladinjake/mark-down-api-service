const redis = require('redis');
const { promisify } = require('util');
const { renderMarkdown } = require('../services/markdownService');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(REDIS_URL);

client.on('error', (err) => console.error('Redis Client Error', err));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

// @desc    Render markdown to HTML (with Redis caching)
// @route   POST /api/render
exports.render = async (req, res) => {
  try {
    const { markdown } = req.body;
    
    if (markdown === undefined) {
      return res.status(400).json({ success: false, error: 'Markdown content is required' });
    }
    
    // Create a cache key (hash would be better but simple string for now)
    const cacheKey = `md:${Buffer.from(markdown).toString('base64').substring(0, 50)}`;
    
    // Check cache
    const cachedHtml = await getAsync(cacheKey);
    if (cachedHtml) {
      return res.status(200).json({ success: true, data: cachedHtml, cached: true });
    }
    
    const html = renderMarkdown(markdown);
    
    // Cache for 1 hour
    await setAsync(cacheKey, 3600, html);
    
    res.status(200).json({ success: true, data: html, cached: false });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
