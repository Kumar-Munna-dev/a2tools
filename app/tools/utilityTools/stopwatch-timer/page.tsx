 

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function StopwatchTimer() {
    const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");

    // Stopwatch
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Timer
    const [timerDuration, setTimerDuration] = useState(60);
    const [remaining, setRemaining] = useState(60);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Stopwatch Logic
    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => setTime((t) => t + 10), 10);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [running]);

    // Timer Logic
    useEffect(() => {
        if (timerRunning && remaining > 0) {
            timerRef.current = setInterval(() => setRemaining((r) => r - 1), 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [timerRunning, remaining]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}.${String(milliseconds).padStart(2, "0")}`;
    };

    const handleLap = () => setLaps((prev) => [time, ...prev]);
    const handleResetStopwatch = () => {
        setTime(0);
        setLaps([]);
        setRunning(false);
    };
    const handleResetTimer = () => {
        setRemaining(timerDuration);
        setTimerRunning(false);
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-3 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-white/30 dark:border-gray-700"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Stopwatch & Timer – Online Time Tracking Tool
                </h1>

                {/* Mode Switch */}
                <div className="flex justify-center gap-3 mb-8 flex-wrap mt-10">
                    <button
                        onClick={() => setMode("stopwatch")}
                        className={`px-4 py-2 sm:px-6 rounded-full font-semibold text-sm sm:text-base ${mode === "stopwatch"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Stopwatch
                    </button>
                    <button
                        onClick={() => setMode("timer")}
                        className={`px-4 py-2 sm:px-6 rounded-full font-semibold text-sm sm:text-base ${mode === "timer"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Timer
                    </button>
                </div>

                {/* Stopwatch Section */}
                {mode === "stopwatch" && (
                    <motion.div
                        key="stopwatch"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-10"
                    >
                        <div className="text-4xl sm:text-5xl font-mono text-gray-900 dark:text-gray-100 mb-6">
                            {formatTime(time)}
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <button
                                onClick={() => setRunning((r) => !r)}
                                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base transition-all ${running
                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {running ? <Pause /> : <Play />} {running ? "Pause" : "Start"}
                            </button>

                            <button
                                onClick={handleResetStopwatch}
                                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-sm sm:text-base"
                            >
                                <RotateCcw /> Reset
                            </button>

                            <button
                                onClick={handleLap}
                                disabled={!running}
                                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold text-sm sm:text-base disabled:opacity-50"
                            >
                                <Timer /> Lap
                            </button>
                        </div>

                        {laps.length > 0 && (
                            <div className="mt-6 bg-white/50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-y-auto max-h-48 sm:max-h-64 text-left">
                                <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                    🏁 Laps
                                </h3>
                                <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                                    {laps.map((lap, i) => (
                                        <li key={i}>
                                            Lap {laps.length - i}: {formatTime(lap)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Timer Section */}
                {mode === "timer" && (
                    <motion.div
                        key="timer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="text-4xl sm:text-5xl font-mono text-gray-900 dark:text-gray-100 mb-6">
                            {new Date(remaining * 1000).toISOString().substr(14, 5)}
                        </div>

                        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4 flex-wrap">
                            <input
                                type="number"
                                value={timerDuration}
                                onChange={(e) => {
                                    const val = Math.max(1, Number(e.target.value));
                                    setTimerDuration(val);
                                    setRemaining(val);
                                }}
                                className="w-24 sm:w-28 p-2 sm:p-3 rounded-lg border border-gray-400 dark:border-gray-600 text-center bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                            />
                            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                seconds
                            </span>
                        </div>

                        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                            <button
                                onClick={() => setTimerRunning((r) => !r)}
                                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base transition-all ${timerRunning
                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {timerRunning ? <Pause /> : <Play />}{" "}
                                {timerRunning ? "Pause" : "Start"}
                            </button>

                            <button
                                onClick={handleResetTimer}
                                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-sm sm:text-base"
                            >
                                <RotateCcw /> Reset
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="mt-40 space-y-4 sm:space-y-6">
                    <InfoDropdown
                        title="⏱️ What Is an Online Stopwatch Tool?"
                        content="An online stopwatch is a digital tool that helps you measure time intervals precisely. Whether you're timing a workout, tracking a presentation, or studying with focus sessions, this stopwatch works instantly in your browser with zero installation required."
                    />

                    <InfoDropdown
                        title="⏳ How Does the Countdown Timer Work?"
                        content="The countdown timer lets you set a custom duration — for example, 30 seconds or 15 minutes — and counts down to zero with perfect accuracy. It’s ideal for workouts, cooking, study intervals, or any task where you need precise timing."
                    />

                    <InfoDropdown
                        title="🎯 Why Use an Online Stopwatch and Timer?"
                        content="Using an online stopwatch or timer helps improve productivity, track progress, and manage time efficiently. Our tool provides a simple, ad-free, distraction-free interface that’s easy to use on mobile or desktop."
                    />

                    <InfoDropdown
                        title="📱 Mobile-Friendly and Offline Stopwatch"
                        content="This stopwatch and timer tool works smoothly on any mobile device or tablet. It automatically adjusts for smaller screens and can be used offline without any downloads or login — your data never leaves your device."
                    />

                    <InfoDropdown
                        title="🏋️ Perfect for Workouts, Sports, and Study"
                        content="Whether you’re an athlete, student, or professional, you can use this stopwatch to time exercises, record laps, or track study sessions. It’s lightweight, fast, and provides accurate timing for all activities."
                    />

                    <InfoDropdown
                        title="🔔 Alerts and Lap Tracking"
                        content="Our stopwatch allows lap tracking to measure individual intervals during running or training. The countdown timer can include sound alerts and notifications to signal when time is up — perfect for multitasking."
                    />

                    <InfoDropdown
                        title="⚡ Privacy and Performance"
                        content="This stopwatch timer runs entirely on your device using browser technology, meaning no data collection, no logins, and no internet needed after load. It’s fast, reliable, and secure — built for privacy-first performance."
                    />
                </div>

            </motion.div>
        </main>
    );
}
