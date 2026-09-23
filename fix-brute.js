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
      
      const idx = content.lastIndexOf('}');
      const seoIdx = content.lastIndexOf('<ToolSEO');
      
      if (seoIdx > idx) {
        console.log('Found ToolSEO after last } in:', fullPath);
        // We need to move it inside.
        // It's after the last }, which means it's outside the component.
        // Let's find the ToolSEO string.
        const seoEnd = content.indexOf('/>', seoIdx) + 2;
        const seoStr = content.substring(seoIdx, seoEnd);
        
        // Remove it from there
        let newContent = content.substring(0, seoIdx) + content.substring(seoEnd);
        
        // Now find where to insert it. Before the last `);`
        const insertIdx = newContent.lastIndexOf(');');
        if (insertIdx !== -1) {
          newContent = newContent.substring(0, insertIdx) + '\n' + seoStr + '\n' + newContent.substring(insertIdx);
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log('Fixed:', fullPath);
        }
      }
    }
  }
}

fixFiles(path.join(__dirname, 'app', 'tools'));
