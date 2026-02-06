"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, Flag, Bell, BellOff, Hourglass, Settings2 } from "lucide-react";
import RelatedTools from "@/app/components/RelatedTools";

export default function StopwatchTimer() {
    const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");
    const [isMuted, setIsMuted] = useState(false);

    // --- Stopwatch State ---
    const [swTime, setSwTime] = useState(0);
    const [swRunning, setSwRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const swIntervalRef = useRef<number | null>(null);
    const swStartTimeRef = useRef<number>(0);

    // --- Timer State ---
    const [tmTotal, setTmTotal] = useState(0);
    const [tmRemaining, setTmRemaining] = useState(0);
    const [tmRunning, setTmRunning] = useState(false);

    // Timer Input States (String based for better typing UX)
    const [hrs, setHrs] = useState("00");
    const [mins, setMins] = useState("05");
    const [secs, setSecs] = useState("00");

    const tmIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // --- Audio System ---
    const playAlarm = useCallback(() => {
        if (isMuted) return;
        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, context.currentTime + 1);
            gain.gain.setValueAtTime(0.2, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
            osc.connect(gain);
            gain.connect(context.destination);
            osc.start();
            osc.stop(context.currentTime + 1);
        } catch (e) { console.error("Audio error", e); }
    }, [isMuted]);

    // --- Stopwatch Logic (High Precision) ---
    const toggleStopwatch = () => {
        if (!swRunning) {
            swStartTimeRef.current = performance.now() - swTime;
            const tick = () => {
                setSwTime(performance.now() - swStartTimeRef.current);
                swIntervalRef.current = requestAnimationFrame(tick);
            };
            swIntervalRef.current = requestAnimationFrame(tick);
        } else {
            if (swIntervalRef.current) cancelAnimationFrame(swIntervalRef.current);
        }
        setSwRunning(!swRunning);
    };

    const resetStopwatch = () => {
        if (swIntervalRef.current) cancelAnimationFrame(swIntervalRef.current);
        setSwTime(0);
        setLaps([]);
        setSwRunning(false);
    };

    // --- Timer Logic ---
    const handleInputChange = (val: string, setter: (v: string) => void, max: number) => {
        const clean = val.replace(/\D/g, "").slice(-2);
        const num = parseInt(clean) || 0;
        if (num <= max) setter(clean.padStart(2, "0"));
    };

    const startTimer = () => {
        if (!tmRunning) {
            // If timer is at 0, initialize it from inputs
            if (tmRemaining <= 0) {
                const total = parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs);
                if (total <= 0) return;
                setTmTotal(total);
                setTmRemaining(total);

                // Set interval logic
                tmIntervalRef.current = setInterval(() => {
                    setTmRemaining((prev) => {
                        if (prev <= 1) {
                            clearInterval(tmIntervalRef.current!);
                            setTmRunning(false);
                            playAlarm();
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                // Resume from pause
                tmIntervalRef.current = setInterval(() => {
                    setTmRemaining((prev) => {
                        if (prev <= 1) {
                            clearInterval(tmIntervalRef.current!);
                            setTmRunning(false);
                            playAlarm();
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } else {
            if (tmIntervalRef.current) clearInterval(tmIntervalRef.current);
        }
        setTmRunning(!tmRunning);
    };

    const resetTimer = () => {
        if (tmIntervalRef.current) clearInterval(tmIntervalRef.current);
        setTmRunning(false);
        setTmRemaining(0);
    };

    // --- Formatters ---
    const formatSW = (ms: number) => {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        const msPart = Math.floor((ms % 1000) / 10);
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(msPart).padStart(2, "0")}`;
    };

    const formatTM = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
        >
            <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
                {/* Mode Selector */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-1">
                        {[
                            { id: "stopwatch", label: "Stopwatch", icon: Timer },
                            { id: "timer", label: "Timer", icon: Hourglass }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setMode(btn.id as any)}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === btn.id ? "bg-white dark:bg-slate-700 shadow-md text-blue-600" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                            >
                                <btn.icon size={18} /> {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {mode === "stopwatch" ? (
                        <motion.div key="sw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                            <div className="text-[5rem] md:text-[8rem] font-mono font-bold tracking-tighter tabular-nums  leading-none mb-12">
                                {formatSW(swTime)}
                            </div>

                            <div className="flex justify-center gap-6 mb-12">
                                <button onClick={toggleStopwatch} className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${swRunning ? "bg-amber-100 text-amber-600 hover:bg-amber-200" : "bg-emerald-500 text-white  hover:bg-emerald-600"}`}>
                                    {swRunning ? <Pause size={40} /> : <Play size={40} fill="currentColor" className="ml-1" />}
                                </button>
                                <button onClick={() => setLaps([swTime, ...laps])} disabled={!swRunning} className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-500 flex items-center justify-center hover:bg-rose-50">
                                    <Flag size={32} />
                                </button>
                                <button onClick={resetStopwatch} className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-500 flex items-center justify-center hover:bg-rose-50">
                                    <RotateCcw size={32} />
                                </button>
                            </div>

                            {laps.length > 0 && (
                                <div className="max-w-md mx-auto rounded-3xl p-6 border border-slate-100 dark:border-slate-800 max-h-60 overflow-y-auto">
                                    {laps.map((l, i) => (
                                        <div key={i} className="flex justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0 font-mono">
                                            <span className=" font-bold">LAP {laps.length - i}</span>
                                            <span className=" font-bold">{formatSW(l)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="tm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                            {/* Circle Visualizer */}
                            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-12">
                                <svg className="absolute w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                    {tmTotal > 0 && (
                                        <motion.circle
                                            cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray="100 100"
                                            animate={{ strokeDashoffset: 100 - (tmRemaining / tmTotal) * 100 }}
                                            className="text-blue-500 transition-all duration-1000 ease-linear"
                                            strokeLinecap="round"
                                        />
                                    )}
                                </svg>

                                <div className="z-10 text-center">
                                    {tmRunning || tmRemaining > 0 ? (
                                        <div className="text-7xl md:text-8xl font-mono font-bold tabular-nums ">
                                            {formatTM(tmRemaining)}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2  dark:bg-slate-800 px-8 py-6 rounded-[2rem] border-2 border-blue-100 dark:border-slate-700">
                                            <input type="text" value={hrs} onChange={e => handleInputChange(e.target.value, setHrs, 99)} className="w-16 bg-transparent text-5xl font-mono text-center outline-none border-b-2 border-transparent focus:border-blue-500" />
                                            <span className="text-3xl  font-bold">:</span>
                                            <input type="text" value={mins} onChange={e => handleInputChange(e.target.value, setMins, 59)} className="w-16 bg-transparent text-5xl font-mono text-center outline-none border-b-2 border-transparent focus:border-blue-500" />
                                            <span className="text-3xl  font-bold">:</span>
                                            <input type="text" value={secs} onChange={e => handleInputChange(e.target.value, setSecs, 59)} className="w-16 bg-transparent text-5xl font-mono text-center outline-none border-b-2 border-transparent focus:border-blue-500" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <button onClick={startTimer} className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${tmRunning ? "bg-amber-100 text-amber-600" : "bg-blue-600 text-white "}`}>
                                    {tmRunning ? <Pause size={40} /> : <Play size={40} fill="currentColor" className="ml-1" />}
                                </button>
                                <button onClick={resetTimer} className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                                    <RotateCcw size={32} />
                                </button>
                                <button onClick={() => setIsMuted(!isMuted)} className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isMuted ? "text-rose-500 bg-rose-50" : "text-slate-400 bg-slate-100"}`}>
                                    {isMuted ? <BellOff size={32} /> : <Bell size={32} />}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Here Moblie card */}
            <div className="order-2  sm:order-1">
                <RelatedTools currentTool="Utility" />
            </div>
        </motion.div>

    );
}