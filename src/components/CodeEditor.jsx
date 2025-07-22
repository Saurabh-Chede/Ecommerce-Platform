export default function CodeEditor({ code, setCode }) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full h-[300px] p-3 border font-mono bg-gray-100 rounded"
    />
  );
}
