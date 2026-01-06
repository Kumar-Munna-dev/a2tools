"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clipboard, Trash2 } from "lucide-react";
import { useToast } from "../../../components/ui/useToast ";
import Button from "../../../components/ui/Button";
import RelatedTools from "@/app/components/RelatedTools";




interface StatCardProps {
  label: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-5 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center">
    <p className="text-sm sm:text-base text-gray-500 font-medium">{label}</p>
    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">{value}</p>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">Word Counter</h1>
      <p className="text-center text-gray-500 text-sm sm:text-base">
        Paste or type your text below to analyze word count, characters, sentences, paragraphs, and reading time.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 ">
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
        className="w-full h-[150px] sm:h-[200px] md:h-[300px] p-4 sm:p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all resize-y"
        placeholder="Start typing or paste your text here..."
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Button onClick={handleCopy} className="w-full sm:w-auto flex items-center justify-center">
          <Clipboard className="mr-2 h-5 w-5" /> Copy Text
        </Button>
        <Button
          onClick={handleClear}
          variant="destructive"
          className="w-full sm:w-auto flex items-center justify-center"
        >
          <Trash2 className="mr-2 h-5 w-5" /> Clear Text
        </Button>
      </div>
      <div className=" md:hidden">
        <RelatedTools currentTool="/tools/textTools/word-counter" />
      </div>
    </motion.div>
  );
};

export default WordCounter;
