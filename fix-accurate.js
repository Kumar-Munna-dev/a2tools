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
      
      const regex = /\n}\r?\n\r?\n\s*<ToolSEO[\s\S]*?\/>/;
      const match = content.match(regex);
      
      if (match) {
        console.log('Found ToolSEO outside in:', fullPath);
        
        // The full match includes `\n}\n\n  <ToolSEO.../>`
        // We want to extract the `<ToolSEO.../>` part
        const seoMatch = content.match(/(<ToolSEO[\s\S]*?\/>)/)[0];
        
        // Remove it from the end (replace the match with just `\n}`)
        content = content.replace(regex, '\n}');
        
        // Insert it before the last `);`
        const insertIdx = content.lastIndexOf(');');
        if (insertIdx !== -1) {
          content = content.substring(0, insertIdx) + '\n' + seoMatch + '\n' + content.substring(insertIdx);
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Fixed:', fullPath);
        }
      }
    }
  }
}

fixFiles(path.join(__dirname, 'app', 'tools'));
