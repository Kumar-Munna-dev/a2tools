"use client";

import React, { useState, useEffect, useRef } from "react";
import { evaluateMath } from "@/app/utils/calculators";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";

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
    const normalized = src.replace(/×/g, "*").replace(/÷/g, "/");
    return evaluateMath(normalized, 14);
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
      sin: "sin(", cos: "cos(", tan: "tan(", ln: "log(", log: "log10(",
      sqrt: "sqrt(", pow2: "^2", pow3: "^3", exp: "exp(", pi: "pi", e: "e", fact: "!",
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
    } catch {}
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
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-4xl mx-auto order-1 lg:order-2" aria-label="Scientific Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Scientific Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Advanced online math calculator with equation history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm">
            
            {/* Display */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2 px-1">
                <span>Expression</span>
                <span>Precision: 14 digits</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex flex-col gap-2 shadow-inner">
                <textarea
                  ref={inputRef}
                  inputMode="none"
                  value={expr}
                  onChange={(e) => setExpr(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. 2 * (3 + sin(0.5))"
                  className="w-full bg-transparent text-2xl sm:text-3xl font-mono text-slate-800 dark:text-slate-100 outline-none resize-none leading-tight"
                  rows={2}
                />
                <div className="flex justify-between items-center text-indigo-600 dark:text-indigo-400">
                  <span className="font-mono text-xl">= {output}</span>
                  <span className="text-xs text-slate-400">Press Enter ⏎</span>
                </div>
              </div>
            </div>

            {/* Standard Number Pad */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 mb-4">
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
                  className={`py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-medium shadow-sm transition-transform active:scale-95 border ${
                    b.special
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent"
                      : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Scientific Row */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
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
                  className="py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm transition-transform active:scale-95"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* History Panel */}
          <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 sm:p-6 h-[400px] lg:h-auto overflow-hidden flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Calculation History</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-sm text-slate-500 italic">
                  No history yet — try a calculation.
                </div>
              ) : (
                history.map((h) => (
                  <div key={h.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                    <div className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">{h.expr}</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mt-1">= {h.res}</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => loadHistory(h)} className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                        Load
                      </button>
                      <button onClick={() => setHistory((s) => s.filter((x) => x.id !== h.id))} className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/50 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Tips:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Use ( ) for grouping</li>
                <li>Trig uses radians by default</li>
                <li>Press <kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded border">Enter</kbd> to evaluate</li>
              </ul>
            </div>
          </aside>
        </div>

        <ToolSEO 
          title="Scientific Calculator"
          howToUse={[
            "Use the advanced buttons for trigonometric functions (sin, cos, tan).",
            "Use logarithmic and exponential functions as needed.",
            "Evaluate complex expressions with full parenthesis grouping."
          ]}
          features={[
            "Trigonometry in Degrees and Radians",
            "Logarithmic and Exponential functions",
            "Parentheses for complex equations",
            "Local history tracking for fast recall",
            "Safe arithmetic parsing using mathjs"
          ]}
          faqs={[
            { question: "Does this support radians?", answer: "Yes, by default trigonometric functions evaluate in radians." },
            { question: "Is my history saved?", answer: "Your history is kept locally in your browser memory for the current session only." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}