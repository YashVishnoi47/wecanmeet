"use client";
import React from "react";
import { motion } from "framer-motion";
import CommonButton from "./CommonButton";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="w-full h-20 flex justify-center items-center">
      <motion.div
        initial={{ width: "12%" }}
        animate={{ width: "70%" }}
        transition={{ duration: 1, type: "spring", delay: 0.5 }}
        className="h-[80%] border-2 rounded-xl flex justify-between items-center px-2"
      >
        {/* Left */}
        <div className="h-full w-1/2 flex items-center gap-10 px-4">
          {/* Logo or Brand Name */}
          <h1
            onClick={() => router.push("/")}
            className="text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer select-none"
          >
            Organised
          </h1>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            {["Features", "How to use"].map((item) => (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, ease: "easeIn" }}
                key={item}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-black border-b-2 hover:scale-105 hover:border-black border-white transition-all duration-200"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="h-full w-1/2 flex justify-end items-center gap-4">
          {!session ? (
            <div className="flex gap-4">
              <CommonButton link={"/sign-in"} text={"Log in"} />
              <CommonButton link={"/sign-up"} text={"Sign up"} />
            </div>
          ) : (
            <div className="flex gap-4 justify-center items-center">
              <CommonButton link={"/"} text={"Go to app"} />
              <Button
                onClick={() => signOut()}
                className="bg-white text-black border cursor-pointer border-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center gap-2 px-5 py-2 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
