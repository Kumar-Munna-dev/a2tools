"use client";
import RelatedTools from "@/app/components/RelatedTools";
import { useEffect, useRef, useState } from "react";

export default function SpeechToTextRealtime() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [finalText, setFinalText] = useState("");
  const [lang, setLang] = useState("en-US");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // This effect runs only in the browser. Defensive checks to avoid errors in sandboxed environments.
    if (typeof window === "undefined") {
      setSupported(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      recognitionRef.current = rec;

      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = lang;

      rec.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) finalTranscript += result[0].transcript;
          else interimTranscript += result[0].transcript;
        }

        if (finalTranscript) {
          setFinalText((t) => (t ? t + "\n" + finalTranscript : finalTranscript));
        }
        setInterim(interimTranscript);
      };

      rec.onerror = (e: any) => {
        console.error("SpeechRecognition error", e);
        setErrorMsg("Speech recognition error: " + (e?.error || e?.message || "unknown"));
        // stop listening state
        setListening(false);
      };

      rec.onend = () => {
        setListening(false);
      };
    } catch (e: any) {
      console.error("Failed to initialize SpeechRecognition", e);
      setSupported(false);
    }

    // cleanup on unmount
    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.onresult = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          try {
            recognitionRef.current.stop();
          } catch { }
        }
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update language when changed
  useEffect(() => {
    if (recognitionRef.current) recognitionRef.current.lang = lang;
  }, [lang]);

  const ensureMicrophonePermission = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) return true;
    try {
      // Request permission briefly to prompt browser permission dialog before starting SpeechRecognition
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop tracks — we only needed permission
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch (e) {
      console.warn("Microphone permission denied or not available", e);
      setErrorMsg("Microphone access is required for speech-to-text. Please allow microphone access in your browser.");
      return false;
    }
  };

  const startListening = async () => {
    setErrorMsg(null);
    if (!recognitionRef.current) {
      setErrorMsg("SpeechRecognition is not available in this browser.");
      return;
    }

    const ok = await ensureMicrophonePermission();
    if (!ok) return;

    try {
      // Some browsers (or calling start twice) can throw — guard it
      recognitionRef.current.start();
      setListening(true);
      setErrorMsg(null);
    } catch (e: any) {
      console.warn("startListening error", e);
      // If already started, we still consider it listening
      if (String(e).includes("already")) setListening(true);
      else setErrorMsg("Could not start speech recognition: " + (e?.message || e));
    }
  };

  const stopListening = () => {
    try {
      if (!recognitionRef.current) return;
      recognitionRef.current.stop();
    } catch (e) {
      console.warn("stopListening error", e);
    } finally {
      setListening(false);
      setInterim("");
    }
  };

  const clearAll = () => {
    setFinalText("");
    setInterim("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(finalText + (interim ? "\n" + interim : ""));
    } catch (e) {
      console.error("copy failed", e);
      setErrorMsg("Copy failed. Check clipboard permissions.");
    }
  };

  const downloadTxt = () => {
    const content = finalText + (interim ? "\n" + interim : "");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!supported) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full dark:bg-slate-950 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Speech to Text (Realtime)</h2>
          <p className="text-sm text-gray-600 mb-3">Your browser does not support the Web Speech API (SpeechRecognition).</p>
          <p className="text-sm text-gray-600">Recommended: Use Chrome or Edge on desktop, or Chrome on Android. In some sandboxed environments (like this preview) the API is unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:p-6 mb-5 lg:flex-row lg:items-start max-w-7xl mx-auto">
      <div className="w-full lg:w-2/3 order-1 dark:bg-slate-950 rounded-2xl shadow p-4 sm:p-6 lg:order-2">
        <h1 className="text-2xl font-semibold text-center mb-2">Speech to Text — Real-time Transcription</h1>
        <p className="text-sm text-gray-600 text-center mb-4">Transcribe your voice into editable text as you speak.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full sm:w-1/2 p-2 border rounded-md"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="es-ES">Español (ES)</option>
            <option value="fr-FR">Français (FR)</option>
            <option value="ar-SA">العربية (SA)</option>
          </select>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={startListening}
              disabled={listening}
              className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
            >Start</button>

            <button
              onClick={stopListening}
              disabled={!listening}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md disabled:opacity-50"
            >Stop</button>

            <button
              onClick={clearAll}
              className="px-4 py-2 bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-md"
            >Clear</button>
          </div>
        </div>

        <div className="dark:bg-slate-950 rounded-md p-3 min-h-[140px] border">
          <textarea
            value={finalText + (interim ? "\n" + interim : "")}
            onChange={(e) => setFinalText(e.target.value)}
            placeholder="Transcribed text will appear here..."
            className="w-full min-h-[120px] bg-transparent resize-vertical outline-none border-none dark:text-slate-400"
          />

          {interim && <div className="text-sm text-gray-500 mt-2">Interim: {interim}</div>}
        </div>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-md">Copy</button>
          <button onClick={downloadTxt} className="px-4 py-2 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-md">Download</button>
          <div className="ml-auto text-xs text-gray-500">Status: {listening ? "Listening..." : "Idle"}</div>
        </div>

        {errorMsg && <div className="mt-4 text-sm text-red-600">Error: {errorMsg}</div>}

        <div className="mt-4 text-xs text-gray-500">Tip: Allow microphone access when prompted. Use a good microphone for accurate transcription.</div>
      </div>

      {/* Here Moblie card */}
      <div className="w-full lg:w-1/3 order-2 flex items-center justify-center lg:order-1">
        <RelatedTools currentTool="Text" />
      </div>
    </div>
  );
}
