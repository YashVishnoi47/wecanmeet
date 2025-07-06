"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VisitGithub() {
  return (
    <Link
      href={"https://github.com/YashVishnoi47/Openschedule.git"}
      target="_blank"
      className="mb-1 px-3 py-1.5 bg-[#0D1117] text-white border border-white/10 flex justify-center items-center gap-2 text-sm md:text-base font-medium rounded-full"
    >
      Visit us on
      <motion.span
        className="inline-flex items-center gap-1 font-semibold transition-colors duration-200 cursor-pointer"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Github className="w-4 h-4" /> {/* Smaller icon size */}
        GitHub
      </motion.span>
    </Link>
  );
}
