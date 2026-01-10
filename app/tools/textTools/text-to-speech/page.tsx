"use client";

import RelatedTools from "@/app/components/RelatedTools";
import { useEffect, useState } from "react";

export default function TextToSpeechTTS() {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceList, setVoiceList] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setVoiceList(voices);
      if (voices.length > 0 && !selectedVoice) {
        setSelectedVoice(voices[0].voiceURI);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Apply live pitch & speed changes while speaking
  useEffect(() => {
    if (currentUtterance) {
      currentUtterance.pitch = pitch;
      currentUtterance.rate = rate;
    }
  }, [pitch, rate, currentUtterance]);

  const speak = () => {
    if (!text.trim()) return;

    // Stop any current speech before starting again
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;

    const voice = voiceList.find((v) => v.voiceURI === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentUtterance(null);
  };

  return (
    <div className="flex flex-col items-center mb-5 mt-20 sm:flex-row sm:items-start ">
      <div className="w-screen order-1 bg-white shadow-md rounded-2xl p-6 sm:order-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">Text to Speech (TTS)</h1>
        <p className="text-sm text-gray-600 text-center mb-4">Convert your text into natural-sounding speech with multiple voice models.</p>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to convert into speech..."
          className="w-full min-h-[160px] sm:min-h-[220px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
        />

        {/* Voice Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Voice Model:</label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            {voiceList.map((voice, index) => (
              <option key={index} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Pitch & Speed Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Pitch: {pitch}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Speed: {rate}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5 flex-wrap">

          <button
            onClick={speak}
            disabled={isSpeaking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >▶️ Play</button>

          <button
            onClick={() => speechSynthesis.pause()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >⏸ Pause</button>

          <button
            onClick={() => speechSynthesis.resume()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >▶️ Resume</button>

          <button
            onClick={stopSpeaking}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >⏹ Stop</button>
        </div>

        <div className="mt-6 text-xs text-gray-500">Tip: Change voice model, pitch, and speed while speaking for real-time effects.</div>
      </div>
      {/* Here Moblie card */}
      <div className="w-max order-2 flex p-5 items-center justify-center sm:order-1" >
        <RelatedTools currentTool="/tools/textTools/word-counter" />
      </div>
    </div>
  );
}
