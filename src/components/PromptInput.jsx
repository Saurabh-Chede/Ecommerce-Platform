import { useState } from "react";

export default function PromptInput({ onGenerate }) {
  const [prompt, setPrompt] = useState("");

  const handleClick = () => {
    onGenerate(prompt);
  };

  return (
    <div className="p-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your website..."
        className="w-full h-32 p-3 border rounded"
      />
      <button
        onClick={handleClick}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Website
      </button>
    </div>
  );
}
