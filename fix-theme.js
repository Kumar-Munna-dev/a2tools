const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('d:/WEB/a2tools/app/tools', (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Fix light background without dark
        content = content.replace(/\bbg-gray-200 text-gray-800\b/g, 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100');
        content = content.replace(/\bbg-gray-200 text-black\b/g, 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100');
        content = content.replace(/\bbg-gray-200\b(?![^"]*dark:bg-)/g, 'bg-slate-200 dark:bg-slate-800 dark:text-slate-100');

        // Fix dark background without dark handling for inverted modes
        content = content.replace(/\bbg-gray-900 text-white\b/g, 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900');
        content = content.replace(/\bbg-gray-800 text-white\b/g, 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900');

        // Fix weird dark mode assignments
        content = content.replace(/dark:bg-gray-50\b/g, 'dark:bg-slate-950 dark:text-slate-100 border-slate-300 dark:border-slate-800');
        content = content.replace(/dark:bg-gray-[89]00\b/g, 'dark:bg-slate-800');
        content = content.replace(/dark:border-gray-[67]00\b/g, 'dark:border-slate-700');

        // Fix generic gray classes to slate for consistency
        content = content.replace(/\bbg-gray-50\b/g, 'bg-slate-50 dark:bg-slate-900');
        content = content.replace(/\btext-gray-800\b/g, 'text-slate-800 dark:text-slate-100');
        content = content.replace(/\btext-gray-900\b/g, 'text-slate-900 dark:text-slate-100');
        
        // Remove duplicate dark: classes that might have been created
        // (Regex for simple duplicates is hard, but NextJS/Tailwind handles duplicate classes fine)

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${filePath}`);
        }
    }
});
