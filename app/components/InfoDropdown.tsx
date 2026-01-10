 

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface InfoDropdownProps {
  title?: string;
  content?: string;
}

export default function InfoDropdown({ title, content }: InfoDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-6"
    >
      {/* Header Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-3.5 
          bg-gray-100 dark:bg-gray-800 rounded-xl 
          hover:bg-gray-200 dark:hover:bg-gray-700 
          transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-base text-left">
          {title}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </motion.div>
      </button>

      {/* Animated Dropdown */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden mt-3 bg-gray-50 dark:bg-gray-900 
              rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="px-5 py-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
