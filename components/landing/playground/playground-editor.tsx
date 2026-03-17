"use client";

import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playgroundEditor } from "@/animations";

const Editor = lazy(() => import("@monaco-editor/react"));

type PlaygroundEditorProps = {
  activeTab: "JavaScript" | "Python" | "cURL";
  code: string;
};

export const PlaygroundEditor = ({
  activeTab,
  code,
}: PlaygroundEditorProps) => {
  const language =
    activeTab === "JavaScript"
      ? "javascript"
      : activeTab === "Python"
      ? "python"
      : "shell";

  return (
    <div className="h-65 bg-black w-full">
      <Suspense
        fallback={
          <div className="h-full w-full bg-gray-800 animate-pulse rounded-md" />
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={playgroundEditor}
            initial="hidden"
            animate="show"
            exit="exit"
            className="h-full"
          >
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              options={{
                fontSize: 16,
                fontFamily: "'Fira Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                readOnly: true,
                lineNumbers: "off",
                automaticLayout: true,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};
