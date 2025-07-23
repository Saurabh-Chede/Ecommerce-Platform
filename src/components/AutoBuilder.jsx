import { useState } from "react";
import PromptInput from "./PromptInput";
import CodeEditor from "./CodeEditor";
import LivePreview from "./LivePreview";
import { generateWebsiteCode } from "@/services/gemini";

function AutoBuilder() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    const generatedCode = await generateWebsiteCode(prompt);
    setCode(generatedCode);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-white space-y-4">
       <h1 className="text-2xl font-bold">AI Website Builder</h1>
      <PromptInput onGenerate={handleGenerate} />
      {loading && <p>Generating code...</p>}
      <CodeEditor code={code} setCode={setCode} /> 
     
       <LivePreview code={code} />
    </div>
  );
}

export default AutoBuilder;
