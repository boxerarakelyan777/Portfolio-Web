'use client';
import React, { useState } from "react";
import styles from "./CodePlayground.module.scss";

export function CodePlayground() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim().toLowerCase() === 'about()') {
        setOutput('Rudik Arakelyan: Software engineer who loves building slick UIs and performant systems.');
      } else {
        setOutput('Unknown command');
      }
      setInput("");
    }
  };

  return (
    <div className={styles.playground}>
      <pre className={styles.output}>{output}</pre>
      <textarea
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="try typing about()"
      />
    </div>
  );
}
