import { motion } from "motion/react";
import { useState } from "react";
import { Heart } from "lucide-react"; // optional, or replace with emoji/icon

export default function PostCard() {
  const post = {
    name: "Saurabh Chede",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPPv5yuXAqgrRuMICII1GtRveOrgASBSWdw&s",
    text: "Just exploring some new ideas with Tailwind and Framer Motion 🚀✨",
  };
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-4 my-6 border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={post.avatar}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{post.name}</h3>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>

      {/* Image */}
      <motion.img
        src={post.image}
        alt="post"
        className="w-full rounded-lg mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      {/* Description */}
      <p className="text-gray-700 mb-4">{post.text}</p>

      {/* Like Button */}
      <motion.button
        onClick={() => setLiked(!liked)}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
          liked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-600"
        }`}
      >
        <Heart
          className={`w-5 h-5 ${liked ? "fill-red-500 stroke-red-500" : ""}`}
        />
        <span>{liked ? "Liked" : "Like"}</span>
      </motion.button>
    </motion.div>
  );
}
