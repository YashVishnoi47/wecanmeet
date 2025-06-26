"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import useUserStore from "@/store/userStore";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const {
    userName,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
  } = useUserStore();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
      setLoading(false);
    } else {
      router.push("/");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          <form
            onSubmit={handleSignIn}
            autoComplete="off"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
