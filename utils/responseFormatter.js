/**
 * Detect if AI response contains code blocks
 * @param {string} text - AI response text
 * @returns {boolean} - Whether the text contains code blocks
 */
exports.detectCode = (text) => {
    // Check for markdown code blocks (```code```)
    const codeBlockRegex = /```[\s\S]*?```/;
    
    // Check for inline code blocks (`code`)
    const inlineCodeRegex = /`[^`]+`/;
    
    // Check for HTML/XML tags
    const htmlRegex = /<\/?[a-z][\s\S]*?>/i;
    
    return codeBlockRegex.test(text) || 
           (inlineCodeRegex.test(text) && text.split('`').length > 4) ||
           htmlRegex.test(text);
  };
  
  /**
   * Format AI response for proper rendering
   * @param {string} text - AI response text
   * @returns {string} - Formatted response
   */
  exports.formatResponse = (text) => {
    // Process markdown code blocks
    let formattedText = text.replace(
      /```(\w*)\n([\s\S]*?)```/g, 
      (match, language, code) => {
        return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
      }
    );
    
    // Process inline code blocks
    formattedText = formattedText.replace(
      /`([^`]+)`/g, 
      (match, code) => {
        return `<code>${escapeHtml(code)}</code>`;
      }
    );
    
    return formattedText;
  };
  
  /**
   * Escape HTML special characters
   * @param {string} html - Text to escape
   * @returns {string} - Escaped text
   */
  function escapeHtml(html) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }