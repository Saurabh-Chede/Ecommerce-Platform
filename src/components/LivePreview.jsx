export default function LivePreview({ code }) {
  return (
    <iframe
      className="w-full h-[400px] border rounded"
      srcDoc={code}
      title="Website Preview"
      
    />
  );
}
