"use client";

import React, { useEffect, useRef, useState } from "react";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { evaluateMath } from "@/app/utils/calculators";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [lastResult, setLastResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isOperator = (ch: string) => ["+", "-", "*", "/", "."].includes(ch);

  const handleClick = (value: string) => {
    setDisplay((prev) => {
      if (value === "C") {
        setLastResult(null);
        return "0";
      }
      if (value === "=") {
        const res = evaluateMath(prev);
        setLastResult(prev + " =");
        return res;
      }
      
      if (prev === "Error" || prev.startsWith("Error")) {
        return isOperator(value) ? "0" + value : value;
      }

      const lastChar = prev[prev.length - 1];

      // Prevent double operators
      if (isOperator(value) && isOperator(lastChar)) return prev.slice(0, -1) + value;

      // Prevent multiple dots in same number
      if (value === ".") {
        const lastOpIndex = Math.max(
          prev.lastIndexOf("+"),
          prev.lastIndexOf("-"),
          prev.lastIndexOf("*"),
          prev.lastIndexOf("/")
        );
        const currentNumber = prev.slice(lastOpIndex + 1);
        if (currentNumber.includes(".")) return prev;
      }

      if (prev === "0" && !isOperator(value)) return value;
      return prev + value;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowed = "0123456789+-*/.=()";
      if (allowed.includes(e.key)) handleClick(e.key);
      if (e.key === "Enter") handleClick("=");
      if (e.key === "Backspace") setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      if (e.key.toLowerCase() === "c") handleClick("C");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (el) requestAnimationFrame(() => (el.scrollLeft = el.scrollWidth));
  }, [display]);

  const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <>
      <main className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100">
        
        <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="Online Basic Calculator">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Basic Calculator</h1>
            <p className="text-slate-600 dark:text-slate-400">Perform standard arithmetic calculations instantly.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm">
            <div className="mb-4 text-right">
              <div className="min-h-[24px] text-sm text-slate-500 mb-1">{lastResult}</div>
              <input
                ref={inputRef}
                type="text"
                readOnly
                value={display}
                aria-label="Calculator display"
                className="w-full bg-slate-50 dark:bg-slate-950 text-right text-3xl sm:text-4xl font-mono text-slate-800 dark:text-slate-100 p-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none overflow-x-auto whitespace-nowrap"
                style={{ caretColor: "transparent" }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {buttons.map((btn) => {
                const isOp = ["+", "-", "*", "/", "="].includes(btn);
                return (
                  <button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    className={`py-4 sm:py-5 rounded-xl text-xl sm:text-2xl font-medium transition-transform active:scale-95 shadow-sm ${
                      isOp
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent"
                        : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                    } border`}
                  >
                    {btn === "/" ? "÷" : btn === "*" ? "×" : btn}
                  </button>
                );
              })}
              
              <button
                onClick={() => handleClick("C")}
                className="col-span-2 py-4 sm:py-5 rounded-xl font-medium text-xl bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 transition-transform active:scale-95"
              >
                Clear All
              </button>
              <button
                onClick={() => setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))}
                className="col-span-2 py-4 sm:py-5 rounded-xl font-medium text-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-transform active:scale-95"
              >
                ⌫ Backspace
              </button>
            </div>
          </div>

          <ToolSEO 
            title="Basic Calculator"
            howToUse={[
              "Click the numbers or use your keyboard to input values.",
              "Select your mathematical operator (+, -, *, /).",
              "Click equals (=) or press Enter to get the exact result."
            ]}
            features={[
              "Standard arithmetic operations (Add, Subtract, Multiply, Divide)",
              "Safe mathematical evaluation (No JavaScript execution errors)",
              "Keyboard support for quick typing",
              "100% client-side instant calculation"
            ]}
            faqs={[
              { question: "Does this support keyboard input?", answer: "Yes, you can use your number pad for rapid calculations, including Backspace and Enter." },
              { question: "Are my calculations saved?", answer: "No, all calculations are temporary and vanish when you reload the page. Nothing is sent to a server." }
            ]}
          />
        </section>

        <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0">
          <RelatedTools currentTool="Calculator" />
        </aside>

      </main>
    </>
  );
}