"use client";

import React, { useState, useEffect, useRef } from "react";
import { evaluate, format } from "mathjs";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

interface HistoryItem {
  id: number;
  expr: string;
  res: string;
}

export default function ScientificCalculator() {
  const [expr, setExpr] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const append = (txt: string) => setExpr((s) => s + txt);

  const safeEval = (src: string): string => {
    try {
      const normalized = src.replace(/×/g, "*").replace(/÷/g, "/");
      const result = evaluate(normalized);
      return typeof result === "number"
        ? format(result, { precision: 14 })
        : String(result);
    } catch {
      return "Error";
    }
  };

  const handleEquals = () => {
    if (!expr.trim()) return;
    const res = safeEval(expr);
    setOutput(res);
    setHistory((h) => [{ expr, res, id: Date.now() }, ...h].slice(0, 20));
  };

  const handleClear = () => {
    setExpr("");
    setOutput("");
  };

  const handleBackspace = () => setExpr((s) => s.slice(0, -1));

  const insertFunction = (fn: string) => {
    const insertMap: Record<string, string> = {
      sin: "sin(",
      cos: "cos(",
      tan: "tan(",
      ln: "log(",
      log: "log10(",
      sqrt: "sqrt(",
      pow2: "^2",
      pow3: "^3",
      exp: "exp(",
      pi: "pi",
      e: "e",
      fact: "!",
    };
    append(insertMap[fn] || fn);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEquals();
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  const pasteExpr = async () => {
    try {
      const t = await navigator.clipboard.readText();
      setExpr((s) => s + t);
    } catch { }
  };

  const loadHistory = (item: HistoryItem) => {
    setExpr(item.expr);
    setOutput(item.res);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        {/* Left: Calculator */}
        <div className="md:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold mb-5">Scientific Calculator – Advanced Online Math Calculator</h1>
          </div>
          <div className="rounded-xl border p-4 dark:bg-slate-800">
            <div className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex justify-between items-start">

                <div className="text-sm ">
                  Precision: 14 digits
                </div>
              </div>

              {/* Display */}
              <div className="mt-3">
                <div className="rounded-lg dark:bg-slate-900 p-3 min-h-[72px] flex flex-col justify-between">
                  <textarea
                    ref={inputRef}
                    inputMode="none"
                    value={expr}
                    onChange={(e) => setExpr(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type expression e.g. 2*(3+sin(0.5))"
                    className="w-full border rounded-2xl p-2 h-30 resize-none outline-none text-lg leading-tight"
                    rows={2}
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm ">
                      Result: <span className="font-medium">{output}</span>
                    </div>
                    <div className="text-xs ">
                      sin cos tan ln log sqrt !
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Pad */}
              <div className="mt-4 grid grid-cols-4 md:grid-cols-5 gap-2 ">
                {[
                  { label: "(", action: () => append("(") },
                  { label: ")", action: () => append(")") },
                  { label: "π", action: () => insertFunction("pi") },
                  { label: "e", action: () => insertFunction("e") },
                  { label: "⌫", action: handleBackspace },

                  { label: "7", action: () => append("7") },
                  { label: "8", action: () => append("8") },
                  { label: "9", action: () => append("9") },
                  { label: "÷", action: () => append("÷") },
                  { label: "√", action: () => insertFunction("sqrt") },

                  { label: "4", action: () => append("4") },
                  { label: "5", action: () => append("5") },
                  { label: "6", action: () => append("6") },
                  { label: "×", action: () => append("×") },
                  { label: "x²", action: () => append("^2") },

                  { label: "1", action: () => append("1") },
                  { label: "2", action: () => append("2") },
                  { label: "3", action: () => append("3") },
                  { label: "+", action: () => append("+") },
                  { label: "xʸ", action: () => append("^") },

                  { label: "0", action: () => append("0") },
                  { label: ".", action: () => append(".") },
                  { label: "%", action: () => append("/100") },
                  { label: "-", action: () => append("-") },
                  { label: "=", action: handleEquals, special: true },
                ].map((b, i) => (
                  <button
                    key={i}
                    onClick={b.action}
                    className={`py-3 rounded-lg text-sm font-medium shadow-sm transition 
                    ${b.special
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-950 text-white hover:shadow-md"
                      }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Scientific Row */}
              <div className="mt-3 grid grid-cols-4 md:grid-cols-5 gap-2">
                {[
                  { label: "sin", action: () => insertFunction("sin") },
                  { label: "cos", action: () => insertFunction("cos") },
                  { label: "tan", action: () => insertFunction("tan") },
                  { label: "ln", action: () => insertFunction("ln") },
                  { label: "log", action: () => insertFunction("log") },

                  { label: "exp", action: () => insertFunction("exp") },
                  { label: "x!", action: () => append("!") },
                  { label: "Ans", action: () => append(String(output)) },
                  { label: "Paste", action: pasteExpr },
                  { label: "Clear", action: handleClear },
                ].map((b, i) => (
                  <button
                    key={i}
                    onClick={b.action}
                    className="py-2 rounded-lg text-sm font-medium shadow-sm bg-indigo-300 hover:shadow-md"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: History */}
        <aside className="p-4 dark:bg-slate-800 rounded-2xl border shadow-inner">
          <h2 className="text-lg font-semibold mb-2">History</h2>
          <div className="flex flex-col gap-2 max-h-80 overflow-auto pr-2">
            {history.length === 0 ? (
              <div className="text-sm ">
                No history yet — try a calculation.
              </div>
            ) : (
              history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-md hover:text-indigo-400"
                >
                  <div className="text-sm">
                    <div className=" font-medium">{h.expr}</div>
                    <div className="text-xs">= {h.res}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadHistory(h)}
                      className="text-xs px-2 py-1 rounded border "
                    >
                      Load
                    </button>
                    <button
                      onClick={() =>
                        setHistory((s) => s.filter((x) => x.id !== h.id))
                      }
                      className="text-xs px-2 py-1 rounded border"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Tips */}
          <div className="mt-4 text-sm ">
            <p className="font-medium">Tips</p>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              <li>Use ( ) for grouping</li>
              <li>Trig uses radians (convert deg → rad)</li>
              <li>Use ! for factorial</li>
              <li>Enter = evaluate, Esc = clear</li>
            </ul>
          </div>
        </aside>

      </div>
      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Calculator" />
      </div>
    </motion.div>

  );
}
