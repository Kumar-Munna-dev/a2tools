 

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  Trash2,
  Save,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Download,
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function OnlineNotepadPage() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [filename, setFilename] = useState("note.html");

  // load saved content
  useEffect(() => {
    const saved = localStorage.getItem("rich-notepad-content");
    if (saved && editorRef.current) {
      editorRef.current.innerHTML = saved;
    }
  }, []);

  // autosave whenever content changes (debounced)
  useEffect(() => {
    if (!autoSave) return;
    const handler = setInterval(() => {
      if (editorRef.current) {
        localStorage.setItem(
          "rich-notepad-content",
          editorRef.current.innerHTML
        );
      }
    }, 2000);
    return () => clearInterval(handler);
  }, [autoSave]);

  const exec = (command: string, value?: string) => {
    // Some browsers may block execCommand but most still support basic commands.
    try {
      document.execCommand(command, false, value ?? "");
      // focus back to editor
      editorRef.current?.focus();
    } catch (err) {
      console.warn("execCommand failed:", command, err);
      alert("This action is not supported in your browser.");
    }
  };

  const setBold = () => exec("bold");
  const setItalic = () => exec("italic");
  const setUnderline = () => exec("underline");
  const setOrderedList = () => exec("insertOrderedList");
  const setBulletList = () => exec("insertUnorderedList");
  const alignLeft = () => exec("justifyLeft");
  const alignCenter = () => exec("justifyCenter");
  const alignRight = () => exec("justifyRight");

  const insertLink = () => {
    const url = prompt("Enter URL (https://...):");
    if (url) exec("createLink", url);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) exec("insertImage", url);
  };

  const clearNote = () => {
    if (confirm("Are you sure you want to clear the note?")) {
      if (editorRef.current) editorRef.current.innerHTML = "";
      localStorage.removeItem("rich-notepad-content");
    }
  };

  const saveAsHTML = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "note.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveAsTXT = () => {
    if (!editorRef.current) return;
    // Strip tags to produce plain text
    const text = editorRef.current.innerText;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (filename || "note.txt").replace(/\.(html|txt)$/i, ".txt");
    a.click();
    URL.revokeObjectURL(url);
  };

  const openFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      // if html, set innerHTML; if text, set innerText
      if (file.name.match(/\.(html|htm)$/i)) {
        if (editorRef.current) editorRef.current.innerHTML = content;
      } else {
        // treat as plain text
        if (editorRef.current) editorRef.current.innerText = content;
      }
      // update filename suggestion
      setFilename(file.name);
    };
    reader.readAsText(file);
    // reset input so same file can be opened again later
    e.currentTarget.value = "";
  };

  const copyHtmlToClipboard = async () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    try {
      // try Clipboard API with HTML support
      if (navigator.clipboard && (window as any).ClipboardItem) {
        const blobInput = new Blob([html], { type: "text/html" });
        // @ts-ignore - ClipboardItem may not be in lib types
        await navigator.clipboard.write([new (window as any).ClipboardItem({ "text/html": blobInput })]);
      } else if (navigator.clipboard && window.isSecureContext) {
        // fallback to plain text copy for secure context
        await navigator.clipboard.writeText(editorRef.current.innerText);
      } else {
        // fallback: textarea
        const ta = document.createElement("textarea");
        ta.value = editorRef.current.innerText;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
      alert("Copy failed on this device. Try manual copy.");
    }
  };

  const downloadHtmlFile = () => {
    saveAsHTML();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Online Notepad – Write, Edit & Save Notes Online
          </h1>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Auto-save
            </label>

            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="hidden sm:inline-block w-40 px-2 py-1 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
              title="Filename (for save)"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
          <button title="Bold" onClick={setBold} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <Bold className="h-5 w-5" />
          </button>
          <button title="Italic" onClick={setItalic} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <Italic className="h-5 w-5" />
          </button>
          <button title="Underline" onClick={setUnderline} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <Underline className="h-5 w-5" />
          </button>

          <div className="border-l h-6 mx-1" />

          <button title="Ordered List" onClick={setOrderedList} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <ListOrdered className="h-5 w-5" />
          </button>
          <button title="Bullet List" onClick={setBulletList} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <List className="h-5 w-5" />
          </button>

          <div className="border-l h-6 mx-1" />

          <button title="Align Left" onClick={alignLeft} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <AlignLeft className="h-5 w-5" />
          </button>
          <button title="Align Center" onClick={alignCenter} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <AlignCenter className="h-5 w-5" />
          </button>
          <button title="Align Right" onClick={alignRight} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <AlignRight className="h-5 w-5" />
          </button>

          <div className="border-l h-6 mx-1" />

          <button title="Insert Link" onClick={insertLink} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <LinkIcon className="h-5 w-5" />
          </button>
          <button title="Insert Image" onClick={insertImage} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <ImageIcon className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex gap-2">
            <button title="Save HTML" onClick={saveAsHTML} className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              <Save className="h-4 w-4" />
            </button>

            <button title="Save as TXT" onClick={saveAsTXT} className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
              <Code className="h-4 w-4" />
            </button>

            <button
              title="Open File"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              <Upload className="h-4 w-4" />
            </button>
            <input ref={fileInputRef} type="file" accept=".html,.htm,.txt,.md" className="hidden" onChange={openFile} />

            <button title="Clear" onClick={clearNote} className="p-2 rounded bg-red-600 text-white hover:bg-red-700">
              <Trash2 className="h-4 w-4" />
            </button>

            <button title="Copy HTML" onClick={copyHtmlToClipboard} className="p-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">
              {copiedHtml ? "✅" : <Download className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="min-h-[420px] p-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 prose max-w-none"
          style={{ outline: "none" }}
          onInput={() => {
            if (autoSave && editorRef.current) {
              localStorage.setItem("rich-notepad-content", editorRef.current.innerHTML);
            }
          }}
        />

        {/* SEO + Info */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="font-semibold mb-2">📖 About Professional Offline Notepad</h2>
          <p>
            A secure, offline rich text notepad that lets you write, format, and save notes directly in your browser. Features include bold, italic, underline, lists, alignment, links, image insertion, and file save/open — all private and local.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <InfoDropdown
            title="📝 What is this Notepad?"
            content="A privacy-first rich text editor that runs entirely in your browser. Nothing is uploaded — everything is saved locally and can be exported as HTML or TXT."
          />
          <InfoDropdown
            title="⚙️ How to edit text?"
            content="Select text and use the toolbar to apply bold, italic, underline, lists, or alignment. Insert links or images by using the respective buttons."
          />
          <InfoDropdown
            title="💾 Save & Open"
            content="Click Save to download your note as HTML, or Save as TXT for plain text. Use Open to load saved .html/.txt files back into the editor."
          />
          <InfoDropdown
            title="🔒 Privacy & Offline"
            content="All data is stored locally (localStorage) and in files you download. No servers are involved — your notes remain private."
          />
        </div>
      </motion.div>
    </main>
  );
}
