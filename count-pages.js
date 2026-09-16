const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (file === 'page.tsx') {
      files.push(fullPath);
    }
  }
  return files;
}

const pages = getFiles('app/tools');
console.log(`Found ${pages.length} tool pages.`);
