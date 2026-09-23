const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (fullPath.endsWith('page.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix the unclosed outer fragment issue
      if (content.includes('<>\r\n\r\n      <SeoMeta') || content.includes('<>\n\n      <SeoMeta')) {
        // Find the inner fragment and remove it so the outer fragment wraps it all
        const regex = /(\/>\s*)<>/g;
        if (regex.test(content)) {
          content = content.replace(regex, '$1');
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Fixed page.tsx fragment issue:', fullPath);
        }
      }

      // Also fix if it was `<>\n      <SeoMeta`
      if (content.includes('<>\r\n      <SeoMeta') || content.includes('<>\n      <SeoMeta')) {
        const regex = /(\/>\s*)<>/g;
        if (regex.test(content)) {
          content = content.replace(regex, '$1');
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Fixed page.tsx fragment issue:', fullPath);
        }
      }
    }
  }
}

fixFiles(path.join(__dirname, 'app', 'tools'));
