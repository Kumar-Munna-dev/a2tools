 "use client";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";
import { useState } from "react";


export default function TextCaseConverter() {
    const [text, setText] = useState("");

    const toUpper = () => setText(text.toUpperCase());
    const toLower = () => setText(text.toLowerCase());
    const toCapitalize = () =>
        setText(
            text.replace(/\b\w/g, (char) => char.toUpperCase())
        );
    const toSentence = () =>
        setText(
            text
                .toLowerCase()
                .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (char) => char.toUpperCase())
        );
    const toAlternate = () =>
        setText(
            text
                .split("")
                .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
                .join("")
        );

    return (
        <>
            <div className="flex flex-col sm:flex-row  gap-20">
                
                               {/* Here Moblie card */}
                <div className="w-max order-2 flex items-center justify-center sm:order-1" >
                    <RelatedTools currentTool="Text" />
                </div>
                
                <div className=" order-1 min-h-screen flex flex-col items-center justify-start p-6 sm:order-2">

                    <div className="  w-full max-w-2xl dark:bg-slate-950 shadow-lg rounded-2xl p-6">
                        <h1 className="text-3xl font-bold text-center mb-6">Text Case Converter – Change Text Case Instantly</h1>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text here..."
                            className="w-full h-40 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                            <button onClick={toUpper} className="p-2 bg-blue-500 text-white rounded-xl shadow">UPPERCASE</button>
                            <button onClick={toLower} className="p-2 bg-blue-500 text-white rounded-xl shadow">lowercase</button>
                            <button onClick={toCapitalize} className="p-2 bg-blue-500 text-white rounded-xl shadow">Capitalize</button>
                            <button onClick={toSentence} className="p-2 bg-blue-500 text-white rounded-xl shadow">Sentence Case</button>
                            <button onClick={toAlternate} className="p-2 bg-blue-500 text-white rounded-xl shadow">aLtErNaTe</button>
                            <button onClick={() => setText("")} className="p-2 bg-red-500 text-white rounded-xl shadow">Clear</button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <InfoDropdown
                            title="Free Online Text Case Converter – Uppercase, Lowercase, Sentence Case & Moree"
                            content="Our Free Online Text Case Converter makes text formatting effortless. Convert any text into UPPERCASE, lowercase, Sentence case, Title Case, and more with a single click. Whether you're a writer, student, developer, or social media creator, this tool helps you save time and maintain perfect formatting. No downloads, no signup—just paste text and convert instantly."
                        />
                        <InfoDropdown
                            title="Best Text Case Converter Tool for Writers & Developers"
                            content="Looking for a fast and accurate way to fix text formatting? This Text Case Converter Tool is ideal for bloggers, students, coders, and content creators. Quickly change between different letter cases like uppercase, lowercase, capitalized, alternating case, and sentence case. It helps improve readability, remove formatting mistakes, and make your content look professional."
                        />
                        <InfoDropdown
                            title="Convert Text Instantly – Uppercase, Lowercase, Capitalize & More"
                            content="Instantly convert your text with our easy and powerful Text Case Converter. From UPPERCASE to lowercase, from capitalize each word to proper sentence case, this tool supports multiple transformations to suit your needs. It's simple, fast, mobile-friendly, and works directly from your browser."
                        />
                        <InfoDropdown
                            title=" Online Letter Case Converter for Perfect Text Formatting"
                            content="Formatting text manually can be time-consuming. That’s why our Online Letter Case Converter helps you transform text in seconds. Just enter your content and choose the desired case style—uppercase, lowercase, or title case. This tool ensures accurate results, making it ideal for emails, articles, coding, and everyday writing tasks."

                        />
                        <InfoDropdown
                            title="Ultimate Text Case Tool – Fix Your Text with One Click"
                            content="This Ultimate Text Case Tool is designed to simplify your editing workflow. Change text to any case style instantly—Sentence case, Title Case, UPPERCASE, lowercase, or aLtErNaTe case. It’s perfect for professionals and students who need clean, readable, and polished text quickly."
                        />
                    </div>
                </div>

 

            </div>

        </>

    );
}
