"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommonButton from "./CommonButton";
import { LogOut, Menu, X } from "lucide-react";
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
  const router = useRouter();
  const { data: session } = useSession();

  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-20 flex justify-center items-center px-4 md:px-0">
      <motion.div
        initial={{ width: "12%" }}
        animate={{ width: "100%", maxWidth: "1200px" }}
        transition={{ duration: 1, type: "spring", delay: 0.5 }}
        className="h-[80%] border-2 rounded-xl flex justify-between items-center px-4 md:px-6"
      >
        {/* Left section */}
        <div className="h-full flex items-center gap-6">
          {/* Logo */}
          <h1
            onClick={() => router.push("/")}
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer select-none"
          >
            Organised
          </h1>

          {/* Navigation Links (Desktop only) */}
          <div className="hidden md:flex gap-6 items-center ml-6">
            {["Features", "How to use"].map((item) => (
              <motion.p
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, ease: "easeIn" }}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-black border-b-2 hover:scale-105 hover:border-black border-white transition-all duration-200"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right Section */}
        {!isMobile ? (
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <CommonButton link="/sign-in" text="Log in" />
                <CommonButton link="/sign-up" text="Sign up" />
              </>
            ) : (
              <>
                <CommonButton link="/dashboard" text="Go to app" />
                <Button
                  onClick={() => signOut()}
                  className="bg-white text-black border border-black hover:bg-black hover:text-white transition duration-200 flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        ) : (
          //  Mobile Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 mt-2 mr-2">
              {["Features", "How to use"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    router.push(`/${item.toLowerCase().replace(/\s/g, "-")}`);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                </DropdownMenuItem>
              ))}

              <hr className="my-2" />

              {!session ? (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/sign-in")}
                    className="cursor-pointer"
                  >
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/sign-up")}
                    className="cursor-pointer"
                  >
                    Sign up
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer"
                  >
                    Go to app
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
