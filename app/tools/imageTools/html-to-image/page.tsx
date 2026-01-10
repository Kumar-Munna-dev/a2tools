'use client';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';


const HtmlToImage: React.FC = () => {
  const [inputMethod, setInputMethod] = useState<string>('html');
  const [url, setUrl] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('<h1>Hello, World!</h1><p>This is a sample webpage.</p>');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [format, setFormat] = useState<string>('png');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      let canvas: HTMLCanvasElement;

      if (inputMethod === 'url' && iframeRef.current) {
        // Try to capture URL content
        await new Promise((resolve) => {
          iframeRef.current!.onload = () => resolve(null);
          iframeRef.current!.src = url;
        });

        try {
          canvas = await html2canvas(iframeRef.current.contentWindow!.document.body, {
            useCORS: true,
            scale: scale,
            width: iframeRef.current.offsetWidth,
            height: iframeRef.current.offsetHeight,
          });
        } catch (err) {
          throw new Error(
            'URL capture failed due to CORS or access restrictions. Please use "Direct HTML" or "File Upload" for reliable results, or ensure the URL supports cross-origin access.'
          );
        }
      } else if (contentRef.current) {
        // Capture HTML content (from textarea or file)
        canvas = await html2canvas(contentRef.current, {
          scale: scale,
          width: contentRef.current.offsetWidth,
          height: contentRef.current.offsetHeight,
        });
      } else {
        throw new Error('Content area not available');
      }

      // Convert canvas to image
      const imgData = canvas.toDataURL(`image/${format}`);
      setImageUrl(imgData);
    } catch (err: any) {
      setError(
        err.message ||
          'Failed to convert to image. Please check your input. Avoid unsupported CSS properties (e.g., lab() colors) and ensure the HTML is valid.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `converted.${format}`;
      link.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHtmlContent(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-4xl w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          HTML to Image – Convert HTML Code into Image Instantly
        </h1>

        {/* Form Section */}
        <form onSubmit={handleConvert} className="space-y-6">
          <div>
            <label htmlFor="inputMethod" className="block text-sm font-medium text-gray-700">
              Input Method
            </label>
            <select
              id="inputMethod"
              value={inputMethod}
              onChange={(e) => setInputMethod(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="html">Direct HTML</option>
              <option value="url">URL</option>
              <option value="file">File Upload</option>
            </select>
          </div>

          {inputMethod === 'url' && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {inputMethod === 'html' && (
            <div>
              <label htmlFor="htmlContent" className="block text-sm font-medium text-gray-700">
                HTML Content
              </label>
              <textarea
                id="htmlContent"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Enter your HTML here..."
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 sm:h-48"
                rows={5}
              />
            </div>
          )}

          {inputMethod === 'file' && (
            <div>
              <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                Upload HTML File
              </label>
              <input
                type="file"
                id="fileUpload"
                accept=".html,.htm"
                onChange={handleFileUpload}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Adjustment Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="scale" className="block text-sm font-medium text-gray-700">
                Image Scale
              </label>
              <input
                type="number"
                id="scale"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                min="0.1"
                max="2"
                step="0.1"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                Image Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || (inputMethod === 'url' && !url) || (inputMethod === 'html' && !htmlContent)}
            className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
              loading || (inputMethod === 'url' && !url) || (inputMethod === 'html' && !htmlContent)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {loading ? 'Converting...' : 'Convert to Image'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Hidden Iframe for URL Input */}
        {inputMethod === 'url' && (
          <iframe
            ref={iframeRef}
            style={{ display: 'none' }}
            title="Webpage Preview"
            sandbox="allow-same-origin allow-scripts"
          />
        )}

        {/* Rendered HTML Preview */}
        {(inputMethod === 'html' || inputMethod === 'file') && htmlContent && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">HTML Preview</h2>
            <div
              ref={contentRef}
              className="border border-gray-300 rounded-md p-4 bg-white max-h-64 sm:max-h-96 overflow-auto mb-6"
              style={{ minHeight: '150px' }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Preview</h2>
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt="Converted HTML"
                className="border border-gray-300 rounded-md shadow-sm max-w-full h-auto"
              />
            </div>
            <button
              onClick={handleDownload}
              className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlToImage;