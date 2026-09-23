const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Fix double > in ToolLayout
      if (content.match(/>\s*>/)) {
        // Only if it's literally > followed by spaces and >
        // Wait, safer:
        if (content.includes('>\r\n    >')) {
          content = content.replace(/>\r\n    >/g, '>');
          changed = true;
        }
        if (content.includes('>\n    >')) {
          content = content.replace(/>\n    >/g, '>');
          changed = true;
        }
        if (content.includes('>\r\n      >')) {
          content = content.replace(/>\r\n      >/g, '>');
          changed = true;
        }
        if (content.includes('>\n      >')) {
          content = content.replace(/>\n      >/g, '>');
          changed = true;
        }
      }

      const toolSeoRegex = /(}[\s\r\n]*)(<ToolSEO[\s\S]*?\/>)/;
      if (toolSeoRegex.test(content)) {
        const match = content.match(/(}[\s\r\n]*)(<ToolSEO[\s\S]*?\/>)/);
        const seoMatch = match[2];
        
        // Remove it from the end
        content = content.replace(toolSeoRegex, '}');
        
        // Insert it right before the last closing tag of the return statement
        const insertRegex = /([\s\S]*)(\s*<\/[a-zA-Z]+>|\s*<\/>)(\s*\)\s*;\s*})$/;
        if (insertRegex.test(content)) {
          content = content.replace(insertRegex, `$1\n${seoMatch}\n$2$3`);
          changed = true;
        } else {
          // fallback, just put it before the last `);`
          const fallbackRegex = /([\s\S]*)(\s*\)\s*;\s*})$/;
          if (fallbackRegex.test(content)) {
            content = content.replace(fallbackRegex, `$1\n${seoMatch}\n$2`);
            changed = true;
          }
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

fixFiles(path.join(__dirname, 'app', 'tools'));
