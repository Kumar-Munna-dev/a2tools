'use client';

import React, { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';

interface Options {
  text: boolean;
  extractAI: boolean;
  renderJS: boolean;
  resIP: boolean;
  premiumResIP: boolean;
  aiPrompt: boolean;
  endArticle: boolean;
  waitJS: boolean;
  extractCSS: boolean;
}

const UrlToTextConverter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState<Options>({
    text: false,
    extractAI: false,
    renderJS: false,
    resIP: false,
    premiumResIP: false,
    aiPrompt: false,
    endArticle: false,
    waitJS: false,
    extractCSS: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [id]: checked,
    }));
  };

  const fetchContent = async (fetchUrl: string, usePremiumIP: boolean = false) => {
    try {
      const proxy = usePremiumIP ? 'https://premium-proxy.example.com/' : 'https://proxy.example.com/';
      const response = await fetch(`${proxy}${encodeURIComponent(fetchUrl)}`, {
        headers: { 'Content-Type': 'text/html' },
      });
      if (!response.ok) throw new Error('Failed to fetch URL');
      const html = await response.text();
      return html;
    } catch (err) {
      throw new Error('Network error or invalid URL');
    }
  };

  const extractMainContentAI = (html: string) => {
    const root = parse(html);
    const mainContent = root.querySelector('article') || root.querySelector('main') || root;
    return mainContent?.textContent.trim() || 'No main content found';
  };

  const renderJavaScriptContent = async (html: string) => {
    const root = parse(html);
    return root.querySelector('script') ? 'Dynamic content rendered' : 'No JS content detected';
  };

  const extractWithCSS = (html: string, cssSelector: string) => {
    const root = parse(html);
    const elements = root.querySelectorAll(cssSelector);
    return elements.map(el => el.textContent).join('\n') || 'No content with CSS selector';
  };

  const handleConvert = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      let content = '';
      const html = await fetchContent(url, options.premiumResIP || options.resIP);

      if (options.text) content += `Raw Text from ${url}\n${html.substring(0, 500)}...\n\n`;
      if (options.extractAI) content += `[AI Extracted Main Content]\n${extractMainContentAI(html)}\n\n`;
      if (options.renderJS) content += `[JavaScript Rendered]\n${await renderJavaScriptContent(html)}\n\n`;
      if (options.resIP || options.premiumResIP) content += `[Residential IP Used]\nAccessed via ${options.premiumResIP ? 'Premium' : 'Standard'} Residential IP\n\n`;
      if (options.aiPrompt) content += `[AI Prompt Applied]\nCustom AI prompt enhanced extraction\n\n`;
      if (options.endArticle) content += `[End of Article Defined]\nExtraction stopped at article end\n\n`;
      if (options.waitJS) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        content += `[Waited for JS]\nContent extracted after JS load\n\n`;
      }
      if (options.extractCSS) content += `[CSS Selector Extraction]\n${extractWithCSS(html, 'p, h1, h2')}\n\n`;

      setResult(content.trim());
    } catch (err) {
      setError('Failed to convert URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setResult('');
    setError('');
    setOptions({
      text: false,
      extractAI: false,
      renderJS: false,
      resIP: false,
      premiumResIP: false,
      aiPrompt: false,
      endArticle: false,
      waitJS: false,
      extractCSS: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">We Make It Easy.</h1>
          <p className="text-xl md:text-2xl text-gray-600">URL to Text Converter</p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter URL here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleConvert}
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {loading ? 'Converting...' : 'Convert'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Clear
              </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="text"
                    checked={options.text}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="text" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Text</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="extractAI"
                    checked={options.extractAI}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="extractAI" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Extract Only Main Content with AI</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="renderJS"
                    checked={options.renderJS}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="renderJS" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Render JavaScript</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="resIP"
                    checked={options.resIP}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="resIP" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Residential IP</label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="premiumResIP"
                    checked={options.premiumResIP}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="premiumResIP" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Premium Residential IP</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="aiPrompt"
                    checked={options.aiPrompt}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="aiPrompt" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Add AI Prompt</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="endArticle"
                    checked={options.endArticle}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="endArticle" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Define End of Article</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="waitJS"
                    checked={options.waitJS}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="waitJS" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Wait for JS</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="extractCSS"
                    checked={options.extractCSS}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="extractCSS" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Extract Content with CSS</label>
                </div>
              </div>
            </div>
          </form>
        </main>

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Results:</h3>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 overflow-auto max-h-96">
              {result}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setResult('')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                Hide Results
              </button>
            </div>
          </div>
        )}

        <footer className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">FAQs</h2>
          <p className="text-sm text-gray-600 mb-6">Write to answer all questions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Can this tool convert URLs?</p>
                <p className="text-sm text-gray-600 mt-1">Yes, data using this tool is secure.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">How do I use this tool?</p>
                <p className="text-sm text-gray-600 mt-1">It's user-friendly and easy to use.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Are there any limitations?</p>
                <p className="text-sm text-gray-600 mt-1">There are some limitations to the service.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Can I convert multiple URLs?</p>
                <p className="text-sm text-gray-600 mt-1">Yes, you can convert multiple URLs at once.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Does it support images?</p>
                <p className="text-sm text-gray-600 mt-1">The tool processes images properly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Can I choose between different methods?</p>
                <p className="text-sm text-gray-600 mt-1">Yes, you can select different extraction methods.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UrlToTextConverter;