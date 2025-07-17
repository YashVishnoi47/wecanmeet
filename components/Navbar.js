"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import CommonButton from "./CommonButton";
import { LogOut, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { scrollY } = useScroll();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  const navWidth = useSpring(useTransform(scrollY, [0, 60], ["80%", "50%"]), {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  const top = useTransform(scrollY, [0, 60], ["5px", "10px"]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.5)"]
  );

  // Handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, type: "spring", delay: 0.5 }}
      style={{ backgroundColor, width: navWidth, top: top }}
      className={`min-h-[65px] sticky top-0 z-50 border border-gray-200/50 backdrop-blur-lg rounded-xl flex justify-between items-center px-4 sm:px-6 shadow-lg shadow-black/5`}
    >
      {/* Left section */}
      <div className="h-full flex items-center gap-4 sm:gap-6 w-1/2">
        {/* Logo */}
        <motion.h1
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer select-none transition-all duration-300 hover:text-black"
        >
          wecanmeet
        </motion.h1>

        {/* Navigation Links (Desktop only) */}
        <div className="hidden lg:flex gap-6 items-center ml-6">
          {["Features", "How to use"].map((item, index) => (
            <motion.p
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-gray-600 cursor-pointer hover:text-black relative group transition-all duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </motion.p>
          ))}
        </div>
      </div>

      {/* Right Section */}
      {!isMobile ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex items-center gap-3 border-black justify-end"
        >
          {!session ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CommonButton
                  link="/sign-in"
                  text="Log in"
                  className="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-black hover:border-gray-400 transition-all duration-300 px-4 py-2 rounded-lg font-medium"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CommonButton
                  link="/sign-up"
                  text="Sign up"
                  className="bg-black text-white border border-black hover:bg-gray-800 hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg font-medium"
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CommonButton
                  link="/dashboard"
                  text="Go to app"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg font-medium"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => signOut()}
                  className="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      ) : (
        //  Mobile Dropdown
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 transition-all duration-300 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 mt-2 mr-2 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl p-2"
            >
              {["Features", "How to use"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    router.push(`/${item.toLowerCase().replace(/\s/g, "-")}`);
                  }}
                  className="cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200 px-3 py-2 text-gray-700 hover:text-black"
                >
                  {item}
                </DropdownMenuItem>
              ))}

              <div className="h-px bg-gray-200 my-2 mx-1" />

              {!session ? (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/sign-in")}
                    className="cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200 px-3 py-2 text-gray-700 hover:text-black"
                  >
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/sign-up")}
                    className="cursor-pointer hover:bg-black hover:text-white rounded-lg transition-all duration-200 px-3 py-2 text-gray-700 font-medium"
                  >
                    Sign up
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white rounded-lg transition-all duration-200 px-3 py-2 text-gray-700 font-medium"
                  >
                    Go to app
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 px-3 py-2 text-red-600 font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
