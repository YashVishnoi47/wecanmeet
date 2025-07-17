"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    // motion.div adds scroll animation
    <motion.footer
      initial={{ opacity: 0, y: 50 }} // starts hidden and slightly below
      whileInView={{ opacity: 1, y: 0 }} // animates when in view
      transition={{ duration: 0.6, ease: "easeOut" }} // smooth transition
      viewport={{ once: true }} // only animates the first time
      className="w-full bg-gray-900 text-white px-6 py-10 mt-20"
    >
      {/* Grid for footer sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">wecanmeet</h2>
          <p className="text-sm text-gray-400">
            Free, secure, and smart scheduling platform built for everyone.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <a
            href="#how-it-works"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Features
          </a>
          <a
            href="#demo"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Book a Demo
          </a>
          <a
            href="#faq"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            FAQ
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start sm:items-end gap-3">
          <h3 className="text-lg font-semibold">Connect with Us</h3>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="text-xl hover:text-white text-gray-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-xl hover:text-white text-gray-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl hover:text-white text-gray-400 transition" />
            </a>
            <a href="https://yourwebsite.com" target="_blank" rel="noreferrer">
              <FaGlobe className="text-xl hover:text-white text-gray-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} wecanmeet — All rights reserved.
      </div>
    </motion.footer>
  );
}
