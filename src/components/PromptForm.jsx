// // ChatInterface.jsx
// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { motion } from "motion/react"
// import { Paperclip, Send } from "lucide-react"

// export default function ChatInterface() {
//   const [messages, setMessages] = useState([
//     { role: "system", content: "What can I help you build?" },
//   ])
//   const [input, setInput] = useState("")
//   const endRef = useRef(null)

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSend = () => {
//     if (!input.trim()) return
//     const newMessage = { role: "user", content: input }
//     setMessages((prev) => [...prev, newMessage])
//     setInput("")
//     // Simulate bot response
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { role: "bot", content: "Let me help you with that." }])
//     }, 800)
//   }

//   return (
//     <div className="bg-gray-50 flex w-full items-center justify-center px-4">
//       <div
//         className="w-full max-w-3xl bg-white shadow-xl rounded overflow-hidden flex flex-col"
//       >
//         <div className="p-6 border-b">
//           <h1 className="text-3xl text-center font-normal">What can I help you build?</h1>
//         </div>

//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ x: msg.role === "user" ? 50 : -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className={`max-w-[80%] p-4 rounded-lg text-sm whitespace-pre-line shadow-sm ${
//                 msg.role === "user"
//                   ? "bg-blue-100 self-end"
//                   : "bg-gray-100 self-start"
//               }`}
//             >
//               {msg.content}
//             </motion.div>
//           ))}
//           <div ref={endRef} />
//         </div>

//         <div className="border-t p-4 flex items-center gap-2">
//           <Button variant="ghost" size="icon">
//             <Paperclip className="h-5 w-5 text-muted-foreground" />
//           </Button>
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Enter your message..."
//             className="flex-1"
//           />
//           <Button onClick={handleSend} variant="default" size="icon">
//             <Send className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { Paperclip, Send } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// ⚠️ FRONTEND KEY: Only use this for testing; it is publicly visible.
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDsaMWw34Gu6FLvkE3hpBUNFvD8Jx0ctIM",
});

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hi! I'm your Marvel expert. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "You are a Marvel Comics expert. Only answer Marvel-related questions. " +
                  input,
              },
            ],
          },
        ],
      });

      const output = await result.response.text();
      setMessages((prev) => [...prev, { role: "model", content: output }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "⚠️ Gemini API error. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-32 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">
            Ask me anything about Marvel!
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ x: msg.role === "user" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[80%] p-4 rounded-lg text-sm whitespace-pre-line shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.content}
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="border-t p-4 flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Enter your message..."
            className="flex-1"
          />
          <Button onClick={handleSend} variant="default" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
