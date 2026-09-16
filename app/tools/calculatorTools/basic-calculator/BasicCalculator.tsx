"use client";

import RelatedTools from "@/app/components/RelatedTools";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

// ✅ Safe Math Evaluator
function safeEvaluate(expression: string): string {
  try {
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) return "Error";
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expression})`)();
    if (isNaN(result) || !isFinite(result)) return "Error";
    return result.toString();
  } catch {
    return "Error";
  }
}

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isOperator = (ch: string) => ["+", "-", "*", "/", "."].includes(ch);

  const handleClick = (value: string) => {
    setDisplay((prev) => {
      if (value === "C") return "0";
      if (value === "=") return safeEvaluate(prev);
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

      if (prev === "0" || prev === "Error") return value;
      return prev + value;
    });
  };

  // ✅ Keyboard support
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
      <main className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100">
        <section
          className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2"
          aria-label="Online Basic Calculator"
        >
          <h1 className="text-3xl font-bold text-center  dark:text-slate-100 mb-4">
            Basic Calculator Online
          </h1>


          <div className="mb-4">
            <input
              ref={inputRef}
              type="text"
              readOnly
              value={display}
              aria-label="Calculator display"
              className="w-full p-3 text-right text-2xl font-mono dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto whitespace-nowrap"
              style={{ caretColor: "transparent" }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {buttons.map((btn) => {
              const isOp = ["+", "-", "*", "/", "="].includes(btn);
              return (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={`py-3 md:py-4 px-2 rounded-lg border text-base md:text-lg font-semibold transition-transform transform active:scale-95 shadow-sm ${isOp
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : " dark:bg-slate-800 dark:hover:bg-gray-100 dark:text-gray-50"
                    }`}
                >
                  {btn === "/" ? "÷" : btn === "*" ? "×" : btn}
                </button>
              );
            })}
            <button
              onClick={() => setDisplay("0")}
              className="col-span-2 py-3 md:py-4 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white transition-transform active:scale-95"
            >
              Clear
            </button>
            <button
              onClick={() =>
                setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
              }
              className="col-span-2 py-3 md:py-4 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 text-white transition-transform active:scale-95"
            >
              ⌫ Back
            </button>
          </div>

          {/* ✅ SEO Content Section */}
          <div className="mt-8 dark:text-slate-300 space-y-4">
            <h2 className="text-xl font-semibold">What is a Basic Calculator?</h2>
            <p>
              A <strong>basic calculator</strong> is a simple mathematical tool that allows you to
              perform arithmetic operations like addition, subtraction, multiplication, and
              division. It’s useful for students, professionals, and anyone who needs quick and
              accurate calculations.
            </p>

            <h2 className="text-xl font-semibold">How to Use Our Calculator</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>Enter your numbers using the buttons or keyboard.</li>
              <li>Use <code>+</code>, <code>-</code>, <code>×</code>, and <code>÷</code> for operations.</li>
              <li>Press <strong>=</strong> to get the result instantly.</li>
              <li>Use <strong>Clear</strong> or <strong>Back</strong> to modify your input.</li>
            </ol>

            <h2 className="text-xl font-semibold">Features of This Online Calculator</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>✅ Responsive design for mobile and desktop.</li>
              <li>✅ Keyboard support for faster input.</li>
              <li>✅ Error detection for invalid expressions.</li>
              <li>✅ Lightweight and free to use on any browser.</li>
            </ul>

            <h3 className="text-lg font-semibold">Why Use a2tool.com Basic Calculator?</h3>
            <p>
              a2tool.com offers a <strong>clean, fast, and privacy-friendly</strong> calculator experience.
              You can calculate instantly without ads or data tracking — built with modern web
              technologies for speed and accuracy.
            </p>

            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            <h4 className="font-medium">Is this calculator free?</h4>
            <p>Yes, it’s completely free to use — no registration required.</p>

            <h4 className="font-medium">Can I use it offline?</h4>
            <p>
              Once loaded in your browser, it can work even if you go offline temporarily.
            </p>
          </div>
        </section>
        <section className="order-2  sm:order-1 justify-center">
          <RelatedTools currentTool="Calculator" />
        </section>
      </main>
    </>
  );
}
