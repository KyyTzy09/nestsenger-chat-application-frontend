import { motion } from "motion/react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";

export default function ChatMediaForm() {
  return (
    <motion.div className="absolute flex flex-col items-center justify-between min-w-[40%] min-h-[60%] w-auto h-auto max-w-[50%] max-h-[80%] rounded-sm bg-[#252525]/70 text-white shadow-lg backdrop-blur border-black border bottom-5 left-10 z-50 overflow-hidden">
      <section className="flex items-center justify-center w-full h-12 bg-[#141414]">
          <p>Media Input</p>
      </section>
      <section className="flex items-center justify-center w-[90%] h-[20%] p-5">
        <img
          className="w-auto max-w-full h-full object-cover"
          src={defaultImage}
          alt="default"
        />
      </section>
      <section className="flex items-center justify-center w-full h-12 bg-[#141414]"></section>
    </motion.div>
  );
}
