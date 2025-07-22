export default function LivePreview({ code }) {
  return (
    <iframe
      className="w-full h-[400px] border rounded"
      srcDoc={code}
      // sandbox="allow-scripts allow-same-origin"
      title="Website Preview"
      
    />
  );
}
