import { useState } from "react";
import PromptInput from "./PromptInput";
import CodeEditor from "./CodeEditor";
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
    <div className="w-full justify-center flex-col mx-auto p-6 flex bg-white">
      <h1 className="text-2xl text-center font-bold">AI Website Builder</h1>
     <div className="flex flex-col max-w-[900px] w-full mx-auto mt-5">
       <PromptInput onGenerate={handleGenerate} />
      {loading && <p>Generating code...</p>}
      <CodeEditor code={code} setCode={setCode} />
     </div>
    </div>
  );
}

export default AutoBuilder;
