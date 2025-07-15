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
      className="w-full h-[55%] flex justify-center items-start px-6 py-8"
    >
      <div className="w-[90%] max-w-6xl h-[95%] bg-white border border-gray-200 rounded-2xl shadow-2xl flex justify-between items-center overflow-hidden">
        {/* Left Sidebar */}
        <div className="h-full w-[32%] border-r border-gray-200 p-6 flex flex-col justify-start gap-6 bg-gray-50">
          {/* Dummy User Info */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-semibold">
              👤
            </div>
            <div className="flex flex-col">
              <p className="text-gray-900 text-lg font-semibold">
                Yash Bishnoi
              </p>
              <a
                href="mailto:yash@example.com"
                className="text-gray-500 text-sm underline hover:text-gray-700 transition"
              >
                yash@example.com
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <div className="flex flex-col gap-4">
            <h2 className="text-gray-800 text-base font-semibold">
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
                className="flex justify-between text-sm text-gray-700"
              >
                <span>{label}:</span>
                <span className="text-right">{value}</span>
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
              className="h-full w-[68%] flex justify-center items-center gap-4 p-6"
            >
              {/* Calendar */}
              <div className="h-full w-[60%] bg-gray-100 rounded-2xl p-6 flex flex-col justify-start items-center border border-gray-200">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  className="text-lg"
                />
              </div>

              {/* Time Slots */}
              <div className="w-[40%] h-full rounded-2xl p-4 flex flex-col bg-gray-100 border border-gray-200">
                <div className="w-full text-center text-gray-800 text-base font-medium py-2 border-b border-gray-300">
                  {selected
                    ? `📅 ${selected.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`
                    : "Select a date"}
                </div>

                <div className="flex-1 overflow-y-auto mt-4 flex flex-col gap-2">
                  {timeOptions.map((item, idx) => (
                    <p
                      key={idx}
                      onClick={() => selected && setTimeAndRedirect(item)}
                      className={`w-full text-center py-2 px-4 rounded-md border text-sm transition cursor-pointer ${
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
              className="h-full w-[68%] p-6 rounded-2xl bg-gray-100 border border-gray-200 flex flex-col gap-6"
            >
              <h2 className="text-gray-800 text-xl font-semibold">
                Client & Meeting Details
              </h2>
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-2 gap-6 text-sm text-gray-700"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label>Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      className="bg-white border border-gray-300 rounded-md px-4 py-2"
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
                      className="bg-white border border-gray-300 rounded-md px-4 py-2"
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
                      rows="4"
                      placeholder="Optional message..."
                      className="bg-white border border-gray-300 rounded-md px-4 py-2"
                      onChange={(e) =>
                        setClientFormDetails((prev) => ({
                          ...prev,
                          clientMsg: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label>Meeting Duration</label>
                    <select
                      required
                      className="bg-white border border-gray-300 rounded-md px-4 py-2"
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
                      className="bg-white border border-gray-300 rounded-md px-4 py-2"
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
                    className="px-6 mt-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[90%] max-w-md bg-white rounded-xl p-6 shadow-xl text-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🎉 Almost there!
              </h2>
              <p className="text-gray-600">
                Sign up to start using <strong>wecanmeet</strong> and book real
                meetings.
              </p>
              <button
                onClick={() => (window.location.href = "/sign-up")}
                className="mt-2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="block mx-auto mt-2 text-sm text-gray-500 hover:underline"
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
