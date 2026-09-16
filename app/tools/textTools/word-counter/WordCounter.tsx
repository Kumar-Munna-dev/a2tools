"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clipboard, Trash2 } from "lucide-react";
import { useToast } from "../../../components/ui";
import { Button } from "../../../components/ui";
import RelatedTools from "@/app/components/RelatedTools";

interface StatCardProps {
  label: string;
  value: number | string;
}

const InfoDropdown = ({ title, content }: { title: string, content: string }) => (
  <div className="border-b border-slate-200 py-4 dark:border-slate-700">
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
        <span className="text-lg text-slate-800 dark:text-slate-200">{title}</span>
        <span className="transition group-open:rotate-180 text-slate-500">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="group-open:animate-fadeIn mt-3 text-slate-600 dark:text-slate-400">
        {content}
      </p>
    </details>
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 shadow-md hover:shadow-lg transition-shadow p-5 rounded-xl text-center flex flex-col justify-center items-center">
    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">{label}</p>
    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">{value}</p>
  </div>
);

const WordCounter: React.FC = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const characters = text.length;
    const sentences = text.match(/[^.!?]+[.!?]+["]?/g) || [];
    const paragraphs = trimmedText.split("\n").filter((p) => p.trim() !== "").length;
    const readingTime = Math.ceil(words.length / 200); // Avg 200 wpm

    return {
      words: words.length,
      characters,
      sentences: sentences.length,
      paragraphs,
      readingTime: `${readingTime} min`,
    };
  }, [text]);

  const handleClear = () => {
    setText("");
    toast({
      title: "Text Cleared!",
      description: "The text area has been reset.",
    });
  };

  const handleCopy = () => {
    if (!text) {
      toast({
        variant: "destructive",
        title: "Nothing to Copy",
        description: "The text area is empty.",
      });
      return;
    }

    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard!",
      description: "Your text has been copied successfully.",
    });
  };

  return (
    <div className="dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:grid lg:grid-cols-12 lg:gap-12 items-start"
        >
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">Word Counter</h1>
              <p className="mt-3 text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Paste or type your text below to instantly analyze word count, characters, sentences, paragraphs, and estimated reading time.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <StatCard label="Words" value={stats.words} />
              <StatCard label="Characters" value={stats.characters} />
              <StatCard label="Sentences" value={stats.sentences} />
              <StatCard label="Paragraphs" value={stats.paragraphs} />
              <StatCard label="Reading Time" value={stats.readingTime} />
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] p-4 sm:p-5 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm transition-all resize-y bg-white dark:bg-slate-900"
              placeholder="Start typing or paste your text here..."
            />
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                aria-label="Copy text"
              >
                <Clipboard size={18} />
                <span>Copy Text</span>
              </Button>

              <Button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                aria-label="Clear text"
              >
                <Trash2 size={18} />
                <span>Clear Text</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <RelatedTools currentTool="Text" />
          </div>
        </motion.div>

        {/* SEO & Info Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50 text-center">
            About Our Online Word Counter
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <InfoDropdown
              title="What is a Word Counter?"
              content="A word counter is a simple online tool that counts the number of words and characters in a piece of text. It's essential for writers, students, marketers, and anyone who needs to meet specific length requirements for articles, essays, social media posts, or reports. Our tool also provides extra insights like sentence count, paragraph count, and estimated reading time."
            />
            <InfoDropdown
              title="How is Reading Time Calculated?"
              content="The estimated reading time is calculated based on the average reading speed of an adult, which is approximately 200 words per minute (WPM). The formula is simple: (Total Word Count / 200). This gives you a good estimate of how long it will take for someone to read your text."
            />
            <InfoDropdown
              title="Why is Word Count Important?"
              content="Word count is crucial for many reasons. For students, it ensures essays meet academic requirements. For bloggers and SEO specialists, it helps in creating content that is long enough to rank well on search engines like Google. For social media managers, it's about staying within character limits on platforms like Twitter. A good word counter helps you optimize your writing for any platform."
            />
            <InfoDropdown
              title="Is This Word Counter Free and Private?"
              content="Yes, this tool is completely free to use. All calculations are performed directly in your browser. We do not save, store, or share any of the text you enter. Your privacy is 100% guaranteed."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
