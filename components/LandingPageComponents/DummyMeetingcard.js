// Final dummy card with working step 1 & 2 and modal popup on submission
"use client";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { motion, AnimatePresence } from "framer-motion";

const DummyMeetingCard = () => {
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [clientFormDetails, setClientFormDetails] = useState({
    clientName: "",
    clientEmail: "",
    clientMsg: "",
    meetingDuration: "",
    meetingMode: "",
  });

  const timeOptions = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
  ];

  const setTimeAndRedirect = (item) => {
    setTime(time === item ? "" : item);
    setStep(2);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="w-full h-[55%] flex justify-center items-start px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8"
    >
      <div className="w-[98%] sm:w-[95%] md:w-[90%] max-w-6xl h-[95%] bg-white border border-gray-200 rounded-xl md:rounded-2xl shadow-2xl flex flex-col lg:flex-row justify-between items-stretch overflow-hidden">
        {/* Left Sidebar */}
        <div className="h-auto lg:h-full w-full lg:w-[32%] border-b lg:border-b-0 lg:border-r border-gray-200 p-3 sm:p-4 md:p-6 flex flex-col justify-start gap-3 sm:gap-4 md:gap-6 bg-gray-50">
          {/* Dummy User Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-lg sm:text-xl font-semibold">
              👤
            </div>
            <div className="flex flex-col">
              <p className="text-gray-900 text-base sm:text-lg font-semibold">
                Yash Bishnoi
              </p>
              <a
                href="mailto:yash@example.com"
                className="text-gray-500 text-xs sm:text-sm underline hover:text-gray-700 transition"
              >
                yash@example.com
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <h2 className="text-gray-800 text-sm sm:text-base font-semibold">
              Meeting Info
            </h2>
            {[
              ["Date", selected ? selected.toDateString() : "Not selected"],
              ["Time", time || "Not selected"],
              ["Duration", clientFormDetails.meetingDuration || "Not selected"],
              ["With", clientFormDetails.clientName || "Not selected"],
              ["Mode", clientFormDetails.meetingMode || "Online"],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="flex justify-between text-xs sm:text-sm text-gray-700"
              >
                <span>{label}:</span>
                <span className="text-right max-w-[60%] truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        {step === 1 ? (
          <AnimatePresence>
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full w-full lg:w-[68%] flex flex-col lg:flex-row justify-center items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6"
            >
              {/* Calendar */}
              <div className="h-auto lg:h-full w-full lg:w-[60%] bg-gray-100 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col justify-start items-center border border-gray-200">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  className="text-sm sm:text-base md:text-lg"
                />
              </div>

              {/* Time Slots */}
              <div className="w-full lg:w-[40%] h-auto lg:h-full rounded-xl md:rounded-2xl p-3 sm:p-4 flex flex-col bg-gray-100 border border-gray-200">
                <div className="w-full text-center text-gray-800 text-sm sm:text-base font-medium py-2 border-b border-gray-300">
                  {selected
                    ? `📅 ${selected.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`
                    : "Select a date"}
                </div>

                <div className="flex-1 overflow-y-auto mt-3 sm:mt-4 flex flex-col gap-2 max-h-48 lg:max-h-none">
                  {timeOptions.map((item, idx) => (
                    <p
                      key={idx}
                      onClick={() => selected && setTimeAndRedirect(item)}
                      className={`w-full text-center py-2 px-3 sm:px-4 rounded-md border text-xs sm:text-sm transition cursor-pointer ${
                        time === item
                          ? "bg-black text-white font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full w-full lg:w-[68%] p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-100 border border-gray-200 flex flex-col gap-4 sm:gap-6"
            >
              <h2 className="text-gray-800 text-lg sm:text-xl font-semibold">
                Client & Meeting Details
              </h2>
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-700"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col gap-1">
                    <label>Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          clientName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Client Email</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          clientEmail: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Message</label>
                    <textarea
                      rows="3"
                      placeholder="Optional message..."
                      className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm resize-none"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          clientMsg: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col gap-1">
                    <label>Meeting Duration</label>
                    <select
                      required
                      className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          meetingDuration: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Duration</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Meeting Mode</label>
                    <select
                      required
                      className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          meetingMode: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Mode</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-4 sm:px-6 mt-2 sm:mt-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-xs sm:text-sm"
                  >
                    Confirm Meeting
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="w-[95%] sm:w-[90%] max-w-md bg-white rounded-xl p-4 sm:p-6 shadow-xl text-center space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                🎉 Almost there!
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Sign up to start using <strong>wecanmeet</strong> and book real
                meetings.
              </p>
              <button
                onClick={() => (window.location.href = "/sign-up")}
                className="mt-2 px-4 sm:px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm sm:text-base"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="block mx-auto mt-2 text-xs sm:text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DummyMeetingCard;
