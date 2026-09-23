const fs = require('fs');

const filesToFix = [
  'd:/WEB/a2tools/app/tools/calculatorTools/bmi-calculator/BMICalculator.tsx',
  'd:/WEB/a2tools/app/tools/calculatorTools/discount-calculator/DiscountCalculator.tsx',
  'd:/WEB/a2tools/app/tools/calculatorTools/gst-vat-calculator/GSTVatCalculator.tsx',
  'd:/WEB/a2tools/app/tools/calculatorTools/percentage-calculator/PercentageCalculator.tsx'
];

for (const file of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find ToolSEO at the bottom and remove it
  const match = content.match(/\n\s*<ToolSEO[\s\S]*?\/>\);/);
  if (match) {
    const seoMatch = match[0].replace(');', ''); // remove the );
    content = content.replace(match[0], '\n  );'); // restore the );
    
    // insert it back into <section>
    content = content.replace('</section>', seoMatch + '\n      </section>');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
}
