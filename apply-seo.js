const fs = require('fs');
const path = require('path');

const toolsContent = {
  // Calculator Tools
  "age-calculator": {
    howToUse: ["Select your Date of Birth.", "Select the target date (defaults to today).", "Click calculate to see your exact age in years, months, and days."],
    features: ["Precise calculation down to days", "Compares any two dates in history", "Instant client-side calculation"],
    faqs: [
      { question: "Is this age calculator accurate?", answer: "Yes, it accounts for leap years and varying month lengths to give an exact chronological age." },
      { question: "Can I check my age on a specific future date?", answer: "Absolutely. Just change the 'To Date' to any future date." }
    ]
  },
  "basic-calculator": {
    howToUse: ["Click the numbers to input values.", "Select your mathematical operator (+, -, *, /).", "Click equals (=) to get the result."],
    features: ["Standard arithmetic operations", "Clean, distraction-free interface", "Keyboard support for quick typing"],
    faqs: [
      { question: "Does this support keyboard input?", answer: "Yes, you can use your number pad for rapid calculations." }
    ]
  },
  "bmi-calculator": {
    howToUse: ["Enter your height in cm or inches.", "Enter your weight in kg or lbs.", "Click calculate to see your Body Mass Index (BMI)."],
    features: ["Supports Metric and Imperial units", "Provides health category classification", "Instant visual indicator"],
    faqs: [
      { question: "What is a healthy BMI?", answer: "A healthy BMI typically falls between 18.5 and 24.9 according to the WHO." }
    ]
  },
  "discount-calculator": {
    howToUse: ["Enter the original price.", "Enter the discount percentage.", "View the final price and your total savings."],
    features: ["Calculates final price instantly", "Shows exact amount saved", "Supports tax calculations"],
    faqs: [
      { question: "Can I use this for sales tax?", answer: "Yes, by entering a negative discount or using it to find the percentage difference." }
    ]
  },
  "gst-vat-calculator": {
    howToUse: ["Enter the base amount.", "Select or enter the GST/VAT tax percentage.", "Choose whether to Add or Remove the tax.", "View the net, gross, and tax amounts."],
    features: ["Add or extract tax from a total", "Customizable tax brackets", "Instant breakdown of amounts"],
    faqs: [
      { question: "What is the difference between Add and Remove GST?", answer: "Add GST calculates the tax on top of a base amount. Remove GST extracts the tax amount from a total inclusive price." }
    ]
  },
  "percentage-calculator": {
    howToUse: ["Choose the type of percentage calculation you need.", "Enter the known values in the input fields.", "The missing percentage or value is calculated automatically."],
    features: ["Calculate percentage of a number", "Find what percentage one number is of another", "Calculate percentage increase or decrease"],
    faqs: [
      { question: "How do I calculate a percentage increase?", answer: "Enter the original value and the new value, and the calculator will show the exact percentage difference." }
    ]
  },
  "scientific-calculator": {
    howToUse: ["Use the advanced buttons for trigonometric functions (sin, cos, tan).", "Use logarithmic and exponential functions as needed.", "Evaluate complex expressions."],
    features: ["Trigonometry in Degrees and Radians", "Logarithmic functions", "Parentheses for complex equations"],
    faqs: [
      { question: "Does this support radians?", answer: "Yes, you can toggle between degree and radian modes for trigonometric calculations." }
    ]
  },

  // Image Tools
  "color-picker": {
    howToUse: ["Upload an image.", "Hover over or click any part of the image.", "Copy the HEX, RGB, or HSL color code."],
    features: ["Pixel-perfect color extraction", "Supports HEX, RGB, and HSL outputs", "Client-side image processing"],
    faqs: [
      { question: "Is my image uploaded anywhere?", answer: "No, the image is rendered locally on your canvas, ensuring complete privacy." }
    ]
  },
  "filters-effects": {
    howToUse: ["Upload an image.", "Adjust sliders for brightness, contrast, saturation, and blur.", "Apply preset filters like Grayscale or Sepia.", "Download the edited image."],
    features: ["Real-time CSS-based previews", "High-quality Canvas rendering", "Multiple filter combinations"],
    faqs: [
      { question: "Can I undo a filter?", answer: "Yes, simply reset the sliders to their default positions (usually 0 or 100%)." }
    ]
  },
  "format-converter": {
    howToUse: ["Upload an image.", "Select your desired output format (JPEG, PNG, WebP).", "Click Convert and download the new file."],
    features: ["Supports next-gen formats like WebP", "Maintains transparency for PNGs", "Fast local conversion"],
    faqs: [
      { question: "Why convert to WebP?", answer: "WebP provides superior compression, reducing file sizes without losing significant quality compared to JPEG or PNG." }
    ]
  },
  "image-compressor": {
    howToUse: ["Upload an image.", "Set your target compression level or max file size.", "Click compress and download the optimized image."],
    features: ["Lossy and lossless compression options", "Visual quality preview", "Bulk processing support"],
    faqs: [
      { question: "Will compression reduce the physical dimensions?", answer: "By default, only the file size (quality) is reduced, but you can also choose to scale down the dimensions to save more space." }
    ]
  },
  "metadata-viewer": {
    howToUse: ["Upload an image.", "View the extracted EXIF data (camera model, location, date).", "Optionally, click 'Remove EXIF' to scrub the data."],
    features: ["Extracts hidden EXIF data", "Privacy tool to strip location metadata", "Client-side processing"],
    faqs: [
      { question: "Why should I remove EXIF data?", answer: "EXIF data can contain GPS coordinates of where a photo was taken. Removing it protects your privacy before sharing online." }
    ]
  },
  "rotator-flipper": {
    howToUse: ["Upload an image.", "Use the rotation buttons (90°, 180°) or flip horizontally/vertically.", "Download the adjusted image."],
    features: ["Lossless rotation", "Horizontal and vertical mirroring", "Instant preview"],
    faqs: [
      { question: "Does rotating affect image quality?", answer: "No, 90-degree rotations are lossless and preserve your image's original quality." }
    ]
  },
  "watermark-tool": {
    howToUse: ["Upload your base image.", "Add text or upload a watermark logo.", "Adjust opacity, size, and position.", "Download the watermarked image."],
    features: ["Custom text and image watermarks", "Adjustable transparency", "Drag-and-drop positioning"],
    faqs: [
      { question: "Can I make the watermark semi-transparent?", answer: "Yes, use the opacity slider to blend the watermark into your image." }
    ]
  },

  // Text Tools
  "speech-to-text": {
    howToUse: ["Click the 'Start Microphone' button.", "Speak clearly into your microphone.", "Copy the transcribed text."],
    features: ["Real-time dictation", "Utilizes browser Web Speech API", "No server uploads for audio"],
    faqs: [
      { question: "Does this require an internet connection?", answer: "Depending on your browser, the Web Speech API may require an internet connection to process speech accurately." }
    ]
  },
  "text-case-converter": {
    howToUse: ["Paste your text into the input box.", "Select a case format (UPPERCASE, lowercase, Title Case, etc.).", "Copy the converted text."],
    features: ["Supports multiple case formats", "Instant conversion", "Handles large text blocks"],
    faqs: [
      { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of most words, commonly used for article titles and headings." }
    ]
  },
  "text-cleaner": {
    howToUse: ["Paste messy text into the editor.", "Select options like 'Remove extra spaces' or 'Remove HTML tags'.", "Click Clean and copy the result."],
    features: ["Strips HTML formatting", "Normalizes spacing and line breaks", "Removes special characters"],
    faqs: [
      { question: "Can this remove invisible characters?", answer: "Yes, the text cleaner normalizes whitespace and removes hidden formatting artifacts." }
    ]
  },
  "text-to-speech": {
    howToUse: ["Paste your text.", "Select a voice and adjust the speed.", "Click 'Play' to hear the text spoken aloud."],
    features: ["Multiple voices and accents", "Adjustable playback speed", "Long text support"],
    faqs: [
      { question: "Can I download the audio?", answer: "This tool plays audio directly in the browser via the Web Speech API; direct MP3 downloads are not natively supported by the API." }
    ]
  },
  "word-counter": {
    howToUse: ["Type or paste your text into the text area.", "View the instant word, character, and sentence count.", "Check the estimated reading time."],
    features: ["Live character and word counts", "Calculates reading time", "Identifies paragraph counts"],
    faqs: [
      { question: "Does the character count include spaces?", answer: "The tool provides both character counts (with spaces) and character counts (without spaces)." }
    ]
  },

  // Utility Tools
  "base64-encoder-decoder": {
    howToUse: ["Paste your text or Base64 string.", "Select Encode or Decode.", "Copy the resulting output."],
    features: ["Bidirectional Base64 conversion", "Supports UTF-8 characters", "Instant processing"],
    faqs: [
      { question: "What is Base64 used for?", answer: "Base64 is used to encode binary data into a standard text format, commonly used in email attachments and data URLs." }
    ]
  },
  "code-minifier": {
    howToUse: ["Paste your HTML, CSS, or JavaScript code.", "Click Minify.", "Copy the compressed code."],
    features: ["Removes whitespace and comments", "Supports HTML, CSS, and JS", "Reduces file size for web performance"],
    faqs: [
      { question: "Will minifying break my code?", answer: "No, a proper minifier safely removes unnecessary characters without changing the logic of the code." }
    ]
  },
  "color-converter-picker": {
    howToUse: ["Enter a HEX, RGB, or HSL value, or use the visual picker.", "View the corresponding converted color codes.", "Copy the formats you need."],
    features: ["HEX to RGB/HSL conversion", "Visual color wheel", "Instant clipboard copying"],
    faqs: [
      { question: "What is HEX?", answer: "HEX is a 6-digit hexadecimal representation of a color, widely used in web design (e.g., #FFFFFF for white)." }
    ]
  },
  "currency-converter": {
    howToUse: ["Enter the amount.", "Select the source currency and the target currency.", "View the converted amount based on live rates."],
    features: ["Supports global currencies", "Live exchange rates", "Simple interface"],
    faqs: [
      { question: "How often are rates updated?", answer: "Exchange rates are typically updated every few hours via our currency API provider." }
    ]
  },
  "date-time-tools": {
    howToUse: ["Select a start date and an end date.", "View the exact difference in days, weeks, months, and years."],
    features: ["Add or subtract days from a date", "Calculate duration between dates", "Timezone support"],
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes, the standard JavaScript Date API handles leap years automatically." }
    ]
  },
  "epoch-converter": {
    howToUse: ["Enter a Unix timestamp.", "Click convert to see the human-readable date and time.", "Alternatively, enter a date to get the epoch timestamp."],
    features: ["Bidirectional timestamp conversion", "Supports seconds and milliseconds", "Local timezone display"],
    faqs: [
      { question: "What is an Epoch timestamp?", answer: "It is the number of seconds (or milliseconds) that have elapsed since January 1, 1970 (Midnight UTC)." }
    ]
  },
  "file-compressor": {
    howToUse: ["Select the files you wish to compress.", "Click 'Create ZIP'.", "Download the compressed ZIP archive."],
    features: ["Client-side ZIP creation", "Supports multiple files", "No server uploads required"],
    faqs: [
      { question: "Is there a file size limit?", answer: "Because it runs in the browser, very large files (over 1GB) may cause your browser to run out of memory." }
    ]
  },
  "file-converter": {
    howToUse: ["Upload your document.", "Select the target format.", "Click Convert and download the file."],
    features: ["Supports common text formats", "Fast processing", "Secure local conversion where possible"],
    faqs: [
      { question: "Are my files secure?", answer: "Yes, we prioritize client-side processing to ensure your files remain on your device." }
    ]
  },
  "json-formatter": {
    howToUse: ["Paste your raw JSON into the editor.", "Click Format to beautify it, or Minify to compress it.", "Errors in the JSON will be highlighted."],
    features: ["Syntax highlighting", "Error validation", "One-click beautify and minify"],
    faqs: [
      { question: "What happens if my JSON is invalid?", answer: "The tool will catch the syntax error and display a message indicating where the JSON is broken." }
    ]
  },
  "json-to-csv": {
    howToUse: ["Paste your JSON array.", "Click Convert.", "Copy the CSV output or download as a file."],
    features: ["Flattens nested JSON", "Instantly generates CSV tables", "Supports large datasets"],
    faqs: [
      { question: "Can it handle nested JSON objects?", answer: "Yes, most converters will flatten nested objects by combining keys, though flat arrays work best." }
    ]
  },
  "online-notepad": {
    howToUse: ["Start typing in the text area.", "Your text is saved automatically to your browser.", "Return later to continue editing."],
    features: ["Auto-save to LocalStorage", "Distraction-free writing", "Character and word counts"],
    faqs: [
      { question: "Where is my text saved?", answer: "It is saved locally in your browser's LocalStorage. If you clear your browser data, the notes will be deleted." }
    ]
  },
  "password-strength-checker": {
    howToUse: ["Type a password into the input field.", "Review the score and feedback provided by the tool."],
    features: ["Checks against common patterns", "Evaluates length and complexity", "100% offline checking"],
    faqs: [
      { question: "Is my password safe here?", answer: "Yes. The strength check runs entirely in your browser using JavaScript. Nothing is sent to a server." }
    ]
  },
  "phone-number": {
    howToUse: ["Select the country code.", "Enter the phone number.", "Click Track to view the carrier and region info."],
    features: ["Identifies telecom operator", "Shows geographic region", "Validates number format"],
    faqs: [
      { question: "Does this track exact GPS locations?", answer: "No, it only tracks public telecom routing information (e.g., State/Country and Carrier)." }
    ]
  },
  "qr-code-generator": {
    howToUse: ["Enter your URL or text.", "Customize the colors and size.", "Click Generate and download the QR code image."],
    features: ["Custom colors and sizing", "Instant generation", "High-resolution downloads"],
    faqs: [
      { question: "Do these QR codes expire?", answer: "No. Standard text/URL QR codes are static and will work forever as long as the destination URL remains active." }
    ]
  },
  "stopwatch-timer": {
    howToUse: ["Click Start to begin counting time.", "Use the Lap button to record intervals.", "Click Stop or Reset as needed."],
    features: ["Millisecond precision", "Lap recording", "Works in background tabs"],
    faqs: [
      { question: "Will the timer run if I close the tab?", answer: "No, the timer relies on the browser tab being open, though it will continue if minimized." }
    ]
  },
  "text-encrypt-decrypt": {
    howToUse: ["Enter your text.", "Provide a secure secret key/password.", "Click Encrypt to scramble the text, or Decrypt to restore it."],
    features: ["AES Encryption standards", "Password-protected encryption", "Client-side security"],
    faqs: [
      { question: "What happens if I forget my secret key?", answer: "Because it uses strong cryptographic algorithms, the text cannot be recovered without the exact secret key." }
    ]
  },
  "unit-converter": {
    howToUse: ["Select the category (Length, Weight, Temperature, etc.).", "Enter your value.", "Select the From and To units to see the conversion."],
    features: ["Supports hundreds of unit combinations", "Instant calculation", "High precision decimals"],
    faqs: [
      { question: "Is the metric to imperial conversion exact?", answer: "Yes, it uses standard internationally accepted conversion factors." }
    ]
  },
  "url-shortener": {
    howToUse: ["Paste a long URL into the box.", "Click Shorten.", "Copy the generated short link."],
    features: ["Creates compact links", "Easy to share", "Maintains redirection"],
    faqs: [
      { question: "How long do the links last?", answer: "It depends on the backend provider used by the tool, but they generally last indefinitely unless violating terms." }
    ]
  }
};

function injectSEO() {
  const toolsDir = path.join(__dirname, 'app', 'tools');
  const categories = fs.readdirSync(toolsDir).filter(c => fs.statSync(path.join(toolsDir, c)).isDirectory());

  let updatedCount = 0;

  for (const category of categories) {
    const catPath = path.join(toolsDir, category);
    const tools = fs.readdirSync(catPath).filter(t => fs.statSync(path.join(catPath, t)).isDirectory());

    for (const tool of tools) {
      const toolData = toolsContent[tool];
      if (!toolData) continue;
      
      const toolFiles = fs.readdirSync(path.join(catPath, tool));
      const componentFile = toolFiles.find(f => f.endsWith('.tsx') && f !== 'page.tsx');
      
      if (componentFile) {
        const compPath = path.join(catPath, tool, componentFile);
        let content = fs.readFileSync(compPath, 'utf8');

        if (content.includes('<ToolLayout')) {
          if (!content.includes('howToUse={[')) {
            const seoProps = `howToUse={${JSON.stringify(toolData.howToUse)}}\n      features={${JSON.stringify(toolData.features)}}\n      faqs={${JSON.stringify(toolData.faqs)}}\n    >`;
            content = content.replace(/<ToolLayout([^>]+?)>/s, (match, p1) => {
              if (p1.includes('howToUse')) return match;
              let cleanedP1 = p1;
              if (cleanedP1.endsWith('/')) cleanedP1 = cleanedP1.slice(0, -1);
              return "<ToolLayout" + cleanedP1 + "\\n      " + seoProps;
            });
            fs.writeFileSync(compPath, content, 'utf8');
            updatedCount++;
          }
        } else {
          // ToolSEO inject
          if (!content.includes('<ToolSEO')) {
            const titleMatch = content.match(/title\\s*=\\s*['"](.*?)['"]/i) || [null, tool.split('-').join(' ').toUpperCase()];
            const title = titleMatch[1];
            
            if (!content.includes('ToolSEO')) {
              content = "import ToolSEO from '@/app/components/ToolSEO';\n" + content;
            }
            
            const toolSeoComponent = `
      <ToolSEO 
        title="${title}"
        howToUse={${JSON.stringify(toolData.howToUse)}}
        features={${JSON.stringify(toolData.features)}}
        faqs={${JSON.stringify(toolData.faqs)}}
      />`;
            
            const lastDivMatch = content.match(/(.*)(<\/[a-z]+>\s*)$/is);
            if (lastDivMatch) {
              content = lastDivMatch[1] + toolSeoComponent + "\n" + lastDivMatch[2];
            } else {
              content += toolSeoComponent;
            }

            fs.writeFileSync(compPath, content, 'utf8');
            updatedCount++;
          }
        }
      }
    }
  }

  console.log("Successfully injected rich SEO content into " + updatedCount + " tools.");
}

injectSEO();
