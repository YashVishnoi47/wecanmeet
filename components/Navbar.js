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

  const top = useTransform(scrollY, [0, 60], ["3px", "6px"]);

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
      className={`min-h-[65px] w-[1215px] sticky top- z-50 border-2 backdrop-blur-xl rounded-xl flex justify-between items-center px-4`}
    >
      {/* Left section */}
      <div className="h-full flex items-center gap-6 w-1/2">
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer select-none"
        >
          wecanmeet
          {/* <Image src={"./wecanmeet2.svg"} height={80} width={80} alt="logo" /> */}
        </h1>

        {/* Navigation Links (Desktop only) */}
        {/* <div className="hidden md:flex gap-6 items-center ml-6">
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
          </div> */}
      </div>

      {/* Right Section */}
      {!isMobile ? (
        <div className="flex items-center gap-4 border-black justify-end">
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
  );
};

export default Navbar;
