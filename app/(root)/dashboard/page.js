"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UseUserStore from "@/store/userStore";
import UseCompStore from "@/store/componentStore";
import dynamic from "next/dynamic";
import { Radio, UserCog } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const { dashboardComp, setDashboardComp } = UseCompStore();
  const [userDetails, SetuserDetails] = useState({
    email: "",
    userName: "",
    FullName: "",
  });

  // Framer Motion variants.
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

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
      console.log("Meeting updated");
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update error:", data.error);
        return;
      }

      console.log("User updated successfully:", data.user);
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
    <div className="w-full h-screen bg-black text-white flex justify-start items-center">
      {/* side Bar */}
      <div className="h-full w-[15%] flex flex-col items-center justify-between text-white shadow-md border-r border-white/10">
        {/* Navigation and header */}
        <div className="w-full h-1/2 flex flex-col ">
          {/* Header */}
          <div className="w-full h-[20%] border-b border-white/10 flex justify-start p-4 items-center text-4xl font-semibold">
            User
          </div>

          {/* Navigation */}
          <div className="w-full flex flex-col items-center mt-4 space-y-2 px-2">
            {["Meetings", "Availability"].map((item, idx) => (
              <button
                onClick={() => setDashboardComp(item)}
                key={idx}
                className={`w-full py-2.5 px-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-start ${
                  item === dashboardComp && "bg-white/10 text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center mb-4 space-y-2 px-2">
          {["Your Live Page"].map((item, idx) => (
            <Link
              href={`/live/${session?.user.userName}`}
              target="_blank"
              key={idx}
              className={`w-full flex gap-2 py-2.5 justify-start items-center px-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-start ${
                item === dashboardComp && "bg-white/10 text-white"
              }`}
            >
              {item === "Your Live Page" && <Radio className="text-sm" />}
              {item}
            </Link>
          ))}
          {/* Profile Settings dialog box */}

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                <UserCog className="w-5 h-5" />
                Profile Settings
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg w-full border-none bg-black text-white p-6 max-h-[80vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="space-y-6"
              >
                {/* Header section */}
                <DialogHeader>
                  {/* Title */}
                  <DialogTitle className="text-2xl font-semibold">
                    Edit Your Profile
                  </DialogTitle>
                  {/* Description */}
                  <DialogDescription className="text-gray-400">
                    Update your personal information below.
                  </DialogDescription>
                </DialogHeader>

                {/* Form fields */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-4"
                >
                  {/* Name field */}
                  <motion.div variants={itemVariants}>
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
                      className="bg-white/10 border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md focus:border-white transition-colors duration-150"
                    />
                  </motion.div>

                  {/* Username field */}
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={userDetails.userName}
                      onChange={(e) =>
                        SetuserDetails((prev) => ({
                          ...prev,
                          userName: e.target.value,
                        }))
                      }
                      className="bg-white/10 border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md  focus:border-white transition-colors duration-150"
                    />
                  </motion.div>

                  {/* Email field */}
                  <motion.div variants={itemVariants}>
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
                      className="bg-white/10 border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md  focus:border-white transition-colors duration-150"
                    />
                  </motion.div>

                  {/* Bio field */}
                  {/* <motion.div variants={itemVariants}>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      // value={tempData.bio}
                      // onChange={handleChange}
                      rows={3}
                      className="bg-white/10 border border-white/30 text-white placeholder-gray-500 mt-1 rounded-md  focus:border-white 
                  transition-colors duration-150
                "
                    />
                  </motion.div> */}
                </motion.div>

                {/* Footer actions */}
                <DialogFooter className="flex justify-end gap-3">
                  {/* Cancel button */}
                  <Button
                    variant="outline"
                    className="text-black border-white hover:bg-white/10 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  {/* Save button */}
                  <Button
                    onClick={updateUser}
                    className="
                bg-white text-black hover:bg-black hover:text-white 
                border border-white transition-all duration-200 cursor-pointer
              "
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main */}
      <div
        className="h-full w-[85%] flex justify-center items-center
       "
      >
        {dashboardComp === "Availability" && <Availability />}
        {dashboardComp === "Meetings" && (
          <Meetings handleComplete={handleComplete} />
        )}
        {dashboardComp === "CardSettings" && <CardSettings session={session} />}
      </div>
    </div>
  );
};

export default Dashboard;
