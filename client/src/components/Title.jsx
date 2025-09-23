import React from "react";
import { motion } from "framer-motion";

const Title = ({ title, subTitle, align = "center" }) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <motion.div
      className={`flex flex-col justify-center ${alignment} gap-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h1
        className="font-extrabold text-3xl md:text-5xl 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        bg-clip-text text-transparent tracking-wide"
      >
        {title}
      </h1>

      {/* Accent underline */}
      <div className="w-16 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

      {/* Subtitle */}
      {subTitle && (
        <p className="text-sm md:text-lg text-gray-400 italic max-w-lg">
          {subTitle}
        </p>
      )}
    </motion.div>
  );
};

export default Title;