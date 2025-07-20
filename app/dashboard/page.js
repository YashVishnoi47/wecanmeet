"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UseUserStore from "@/store/userStore";
import UseCompStore from "@/store/componentStore";
import dynamic from "next/dynamic";
import { LogOut, Radio, UserCog } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// Dynamic Components
const Availability = dynamic(() => import("@/components/Availability"));
const Meetings = dynamic(() => import("@/components/Meetings"));
const CardSettings = dynamic(() => import("@/components/CardSettings"));

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    setUserCard,
    setuserMeetings,
    triggerMeetingFetch,
    setTriggerMeetingFetch,
  } = UseUserStore();
  const { dashboardComp, setDashboardComp, settingsComp, setSettingsComp } =
    UseCompStore();
  const [userDetails, SetuserDetails] = useState({
    email: "",
    userName: "",
    FullName: "",
    profession: "",
  });

  // Function to set the meeting done
  const handleComplete = async (complete, meetingId) => {
    if (!complete || !meetingId) return;
    try {
      const res = await fetch(
        `/api/meeting/setMeetingDone?meetingId=${meetingId}&completed=${complete}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      }
      setTriggerMeetingFetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Cancel Meeting.
  const handleCancelMeeting = async (meetingId) => {
    try {
      const res = await fetch("/api/meeting/cancelMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meetingId: meetingId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      }

      setTriggerMeetingFetch((prev) => !prev);
      console.log(data.success);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching Cards When the session is available
  useEffect(() => {
    if (!session?.user?._id) return;
    const fetcCard = async () => {
      try {
        const res = await fetch(
          `/api/meeting/fetchMeetingCard?ownerID=${session?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setUserCard(data.Cards);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetcCard();
  }, [session]);

  // Fetching User Meetings.
  useEffect(() => {
    if (!session) return;
    const fetchMeeting = async () => {
      try {
        const res = await fetch(
          `/api/meeting/fetchMeetings?ownerID=${session?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setuserMeetings(data.meetings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeeting();
  }, [session, triggerMeetingFetch]);

  // function to fetch User details.
  const fetchUserDetails = async () => {
    try {
      const res = await fetch(
        `/api/user/fetchUserDetails?userID=${session.user._id}&userDetails=${userDetails}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      // console.log("data", data);

      if (!res.ok) {
        console.log(data.error);
      }

      if (data) {
        SetuserDetails({
          email: data.user.Email,
          userName: data.user.userName,
          FullName: data.user.FullName,
          profession: data.user.profession,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchUserDetails();
  }, [session]);

  // Function to update user
  const updateUser = async () => {
    try {
      const res = await fetch("/api/user/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id,
          email: userDetails.email,
          FullName: userDetails.FullName,
          userName: userDetails.userName,
          Professtion: userDetails.Professtion,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update error:", data.error);
        return;
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!session) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Access Denied
        </motion.h1>

        <motion.p
          className="mt-4 text-sm md:text-base text-gray-300 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          You are not authorized to view this page. Please log in to continue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <Button
            className="bg-white text-black hover:bg-black hover:text-white  hover:border-white active:scale-95 border  border-black transition-all duration-300 ease-in-out px-6 py-2 rounded-xl shadow-lg cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Mobile Topbar with Sheet Trigger */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/80">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-white px-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-black text-white w-[70%] p-4">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-lg">{session?.user.FullName}</p>
              {["Meetings", "Availability"].map((item) => (
                <button
                  key={item}
                  onClick={() => setDashboardComp(item)}
                  className={`text-left w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    item === dashboardComp
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
              <Link
                href={`/live/${session?.user.userName}`}
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10"
              >
                <Radio className="w-4 h-4" />
                Your Live Page
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <p className="text-white text-lg font-semibold">Dashboard</p>
      </div>

      {/* Sidebar (Desktop Only) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.5,
          delay: 0.1,
        }}
        className="hidden md:flex h-full w-[15%] flex-col justify-between text-white bg-black/40 backdrop-blur-md border border-white/10 shadow-md rounded-2xl"
      >
        {/* Top section */}
        <div className="w-full flex flex-col items-center gap-6 px-3 pt-6">
          <div className="w-full flex items-center gap-4 p-4 border bg-black/70 border-white/20 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full border border-white/40 bg-white/20"></div>
            <p className="text-lg font-semibold truncate capitalize">
              {session?.user.FullName}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            {["Meetings", "Availability"].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setDashboardComp(item)}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                  item === dashboardComp
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col gap-2 px-3 pb-6">
          <Link
            href={`/live/${session?.user.userName}`}
            target="_blank"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Radio className="w-4 h-4" />
            Your Live Page
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10">
                <UserCog className="w-5 h-5" />
                Profile Settings
              </button>
            </DialogTrigger>
            <DialogTitle>{""}</DialogTitle>

            <DialogContent className="sm:max-w-[50%] sm:h-[80%] w-full flex justify-center items-center bg-black/10 backdrop-blur-md text-white p-0 gap-0 max-h-[80vh] overflow-y-auto border-white/20">
              {/* Left Section */}
              <div className="h-full w-[30%] border-r-2 border-white/10 rounded-xl flex flex-col gap-3 items-center text-white">
                <h1 className="w-full flex justify-center items-center text-2xl py-4 border-b border-gray-500 mb-4">
                  Settings
                </h1>
                {["User Settings"].map((item, idx) => (
                  <div
                    onClick={() => setSettingsComp(item)}
                    className={`w-[95%] px-2 py-2 border border-white/10 rounded-lg hover:bg-white/10 backdrop-blur-lg transition-all duration-300 ease-in-out cursor-pointer text-md ${settingsComp === item ? "bg-white/10" : ""}`}
                    key={idx}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Right Section */}
              <div className="h-full w-[70%] rounded-xl overflow-x-hidden overflow-y-hidden ">
                <AnimatePresence>
                  {settingsComp === "User Settings" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -200 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -200 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="w-full h-full flex justify-center items-start flex-col p-0 "
                    >
                      <DialogHeader className={" w-[90%] h-[12%] p-2"}>
                        <DialogTitle className="text-2xl font-semibold">
                          Edit Your Profile
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Update your personal information below.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="w-[90%] h-[78%] flex flex-col px-2 py-4">
                        {/* Name */}
                        <div className="w-[90%] p-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={userDetails.FullName}
                            onChange={(e) =>
                              SetuserDetails((prev) => ({
                                ...prev,
                                FullName: e.target.value,
                              }))
                            }
                            className="bg-white/10 w-full border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md focus:border-white"
                          />
                        </div>

                        {/* Username */}
                        <div className="w-[90%] p-2">
                          <Label htmlFor="username">
                            Username
                            <p className={"text-gray-400 text-xs"}>
                              (Cannot be changed)
                            </p>
                          </Label>
                          <Input
                            id="username"
                            name="username"
                            disabled
                            value={userDetails.userName}
                            onChange={(e) =>
                              SetuserDetails((prev) => ({
                                ...prev,
                                userName: e.target.value,
                              }))
                            }
                            className="bg-white/10 w-full border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md focus:border-white"
                          />
                        </div>

                        {/* Email */}
                        <div className="w-[90%] p-2">
                          <Label htmlFor="email">Your Profession</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={userDetails.profession}
                            onChange={(e) =>
                              SetuserDetails((prev) => ({
                                ...prev,
                                profession: e.target.value,
                              }))
                            }
                            className="bg-white/10 w-full border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md focus:border-white"
                          />
                        </div>

                        {/* Email */}
                        <div className="w-[90%] p-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={userDetails.email}
                            onChange={(e) =>
                              SetuserDetails((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="bg-white/10 w-full border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md focus:border-white"
                          />
                        </div>

                        {/* Save changes */}
                        <div className="flex justify-end w-[90%] items-center h-[10%] gap-3">
                          <Button
                            onClick={updateUser}
                            className="bg-white  text-black mt-10 hover:bg-white/20 hover:text-white border border-white transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>

                      <DialogFooter className="flex justify-end w-[90%] items-center h-[10%] gap-3"></DialogFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full md:w-[85%] h-full overflow-y-auto">
        {dashboardComp === "Availability" && <Availability />}
        {dashboardComp === "Meetings" && (
          <Meetings
            handleCancelMeeting={handleCancelMeeting}
            handleComplete={handleComplete}
          />
        )}
        {dashboardComp === "CardSettings" && <CardSettings session={session} />}
      </div>
    </div>
  );
};

export default Dashboard;
