"use client";

import Editor from "@monaco-editor/react";

interface MonacoProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export const MonacoEditor = ({
  value,
  onChange,
  height = "100px",
}: MonacoProps) => {
  return (
    <div className="border rounded-xl overflow-hidden border-accent-foreground">
      <Editor
        height={height}
        defaultLanguage="json"
        value={value}
        onChange={(val) => onChange(val || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          formatOnType: true,
          formatOnPaste: true,
          lineNumbers: "off",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};
