import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Main pages
    { url: 'https://a2tool.com/', lastModified },
    { url: 'https://a2tool.com/tools/', lastModified },
    { url: 'https://a2tool.com/about/', lastModified },
    { url: 'https://a2tool.com/contact/', lastModified },
    { url: 'https://a2tool.com/request-tool/', lastModified },
    { url: 'https://a2tool.com/privacy/', lastModified },
    { url: 'https://a2tool.com/privacy-policy', lastModified },
    { url: 'https://a2tool.com/terms/', lastModified },

    // Text Tools
    { url: 'https://a2tool.com/tools/textTools/word-counter/', lastModified },
    { url: 'https://a2tool.com/tools/textTools/text-case-converter/', lastModified },
    { url: 'https://a2tool.com/tools/textTools/text-cleaner/', lastModified },
    { url: 'https://a2tool.com/tools/textTools/text-to-speech/', lastModified },
    { url: 'https://a2tool.com/tools/textTools/speech-to-text/', lastModified },

    // Image Tools
    { url: 'https://a2tool.com/tools/imageTools/image-compressor/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/resizer-cropper/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/format-converter/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/color-picker/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/rotator-flipper/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/watermark-tool/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/filters-effects/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/metadata-viewer/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/html-to-image/', lastModified },

    // Utility Tools
    { url: 'https://a2tool.com/tools/utilityTools/qr-code-generator/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/password-generator/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/password-strength-checker/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/url-shortener/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/online-notepad/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/unit-converter/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/currency-converter/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/stopwatch-timer/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/date-time-tools/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/epoch-converter/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/base64-encoder-decoder/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/json-formatter/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/code-minifier/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/json-to-csv/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/color-converter-picker/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/text-encrypt-decrypt/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/file-compressor/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/file-converter/', lastModified },

    // Calculator Tools
    { url: 'https://a2tool.com/tools/calculatorTools/basic-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/scientific-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/percentage-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/gst-vat-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/discount-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/emi-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/age-calculator/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/bmi-calculator/', lastModified },
  ];
}
