 

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    Trash2,
    Upload,
    Download,
    Copy,
    CheckCircle,
    AlertTriangle,
    Mic
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function JSONFormatterValidator() {
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const fileRef = useRef<HTMLInputElement | null>(null);

    // parse safely, return parsed or throw
    const tryParse = (txt: string) => {
        // allow trailing newlines/spaces
        return JSON.parse(txt);
    };

    const handleValidate = () => {
        setError(null);
        setOutput("");
        try {
            tryParse(input);
            setError(null);
            setOutput("✅ JSON is valid.");
        } catch (err: any) {
            setError(err?.message || "Invalid JSON");
        }
    };

    const handleFormat = (spaces = 2) => {
        setError(null);
        try {
            const parsed = tryParse(input);
            const pretty = JSON.stringify(parsed, null, spaces);
            setOutput(pretty);
        } catch (err: any) {
            setError(err?.message || "Invalid JSON");
            setOutput("");
        }
    };

    const handleMinify = () => {
        setError(null);
        try {
            const parsed = tryParse(input);
            const min = JSON.stringify(parsed);
            setOutput(min);
        } catch (err: any) {
            setError(err?.message || "Invalid JSON");
            setOutput("");
        }
    };

    const handleCopy = async (text: string) => {
        if (!text) return;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // fallback
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.setAttribute("readonly", "");
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            alert("Copy failed — please copy manually.");
        }
    };

    const handleDownload = (fileName = "data.json", data?: string) => {
        const payload = (data ?? output ?? input) || "";
        if (!payload) return alert("Nothing to download");
        const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target?.result as string;
            setInput(text);
            setOutput("");
            setError(null);
        };
        reader.readAsText(file);
        // reset so same file can be picked again
        e.currentTarget.value = "";
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    const handleBeautifyExamples = (preset: "compact" | "pretty2" | "pretty4") => {
        if (!input.trim()) return;
        if (preset === "compact") return handleMinify();
        if (preset === "pretty2") return handleFormat(2);
        handleFormat(4);
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-start justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-4xl backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-3xl shadow-xl p-5 sm:p-8 border border-white/30 dark:border-gray-700"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
                    JSON Formatter – Format, Validate & Beautify JSON Online
                </h1>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-4">
                    <div className="flex gap-2 flex-1">
                        <button
                            onClick={() => handleFormat(2)}
                            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                            title="Prettify (2 spaces)"
                        >
                            <Mic className="inline mr-2 h-4 w-4" /> Prettify
                        </button>

                        <button
                            onClick={handleMinify}
                            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                            title="Minify"
                        >
                            Minify
                        </button>

                        <button
                            onClick={handleValidate}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                            title="Validate"
                        >
                            Validate
                        </button>
                    </div>

                    <div className="flex flex-wrap sm:justify-start gap-2 sm:gap-3 mt-2">
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all"
                            title="Open JSON file"
                        >
                            <Upload className="h-4 w-4" /> Open
                        </button>
                        <input
                            type="file"
                            accept=".json,.txt"
                            ref={fileRef}
                            className="hidden"
                            onChange={handleOpenFile}
                        />

                        <button
                            onClick={() => handleDownload('formatted.json')}
                            className="flex items-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-all"
                            title="Download result"
                        >
                            <Download className="h-4 w-4" /> Download
                        </button>

                        <button
                            onClick={() => handleCopy(output || input)}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all"
                            title="Copy"
                        >
                            <Copy className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy'}
                        </button>

                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
                            title="Clear"
                        >
                            <Trash2 className="h-4 w-4" /> Clear
                        </button>
                    </div>

                </div>

                {/* Editor */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    {/* Left - Input JSON */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Input JSON
                        </label>

                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError(null);
                            }}
                            placeholder='Paste JSON here, e.g. {"name":"Munna","age":25}'
                            rows={15}
                            className="w-full min-h-80 sm:min-h-[380px] p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm sm:text-sm font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                        />

                        {/* Small Buttons */}
                        <div className="flex items-center gap-3 mt-3 flex-wrap justify-between">
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => handleBeautifyExamples("pretty2")}
                                    className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
                                >
                                    Prettify (2)
                                </button>
                                <button
                                    onClick={() => handleBeautifyExamples("pretty4")}
                                    className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
                                >
                                    Prettify (4)
                                </button>
                                <button
                                    onClick={() => handleBeautifyExamples("compact")}
                                    className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
                                >
                                    Compact
                                </button>
                            </div>

                            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                {input.length} chars
                            </span>
                        </div>
                    </div>

                    {/* Right - Output JSON */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Output / Result
                        </label>

                        <div
                            className={`w-full min-h-80 sm:min-h-[380px] max-h-[500px] overflow-auto p-3 rounded-lg border ${error
                                ? "border-red-400 bg-red-50 dark:bg-red-900/30"
                                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                                } text-sm sm:text-sm font-mono text-gray-900 dark:text-gray-100`}
                        >
                            {error ? (
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-red-600 dark:text-red-300 h-5 w-5 mt-1" />
                                    <div>
                                        <div className="font-semibold text-red-700 dark:text-red-300">
                                            Invalid JSON
                                        </div>
                                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                                            {error}
                                        </div>
                                        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                                            Tip: Check for commas, missing quotes, or brackets.
                                        </div>
                                    </div>
                                </div>
                            ) : output ? (
                                <pre className="whitespace-pre-wrap wrap-break-word">{output}</pre>
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    <CheckCircle className="inline-block mr-2 h-5 w-5 text-green-600 dark:text-green-300" />
                                    Result will appear here after formatting or validation.
                                </div>
                            )}
                        </div>

                        {/* Copy + Download Buttons */}
                        <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
                            <button
                                onClick={() => handleCopy(output || input)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all"
                            >
                                <Copy className="h-4 w-4" />
                                {copied ? "Copied!" : "Copy"}
                            </button>

                            <button
                                onClick={() => {
                                    if (output) handleDownload("formatted.json", output);
                                    else handleDownload("data.json", input);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-all"
                            >
                                <Download className="h-4 w-4" />
                                Save Result
                            </button>
                        </div>
                    </div>
                </div>


                {/* SEO / Info */}
                <div className="mt-6 space-y-4 sm:space-y-6">
                    <InfoDropdown
                        title="🧾 What is JSON Formatter & Validator?"
                        content="A JSON formatter (beautifier) makes messy JSON readable by adding indentation and line breaks. The validator checks JSON syntax and points out errors instantly in the browser."
                    />
                    <InfoDropdown
                        title="⚙️ How to Use"
                        content="Paste your JSON into the left panel and click Prettify to beautify, Minify to compact, or Validate to check for errors. You can also open .json files, copy results, or download formatted output."
                    />
                    <InfoDropdown
                        title="🔍 Common JSON Errors"
                        content="Typical issues include trailing commas, missing quotes around keys/strings, mismatched brackets, or unexpected tokens. The validator shows the error message to help you fix it quickly."
                    />
                    <InfoDropdown
                        title="📁 File Support"
                        content="Upload .json or .txt files containing JSON to load content into the editor. Download formatted JSON directly to your device for sharing or storage."
                    />
                    <InfoDropdown
                        title="📱 Works Offline & Mobile-Friendly"
                        content="All parsing and formatting happen locally in your browser — no data is sent to servers. The interface is responsive and works well on phones and tablets."
                    />
                    <InfoDropdown
                        title="🔒 Privacy & Security"
                        content="Because everything runs client-side, your JSON stays private and never leaves your device. Use secure methods when handling sensitive data."
                    />
                </div>
            </motion.div>
        </main>
    );
}
