import "../globals.css";

import { Rubik } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

export const metadata = {
  title: "wecanmeet",
  description: "A minimalist Web-App for organising your Meetings ",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${rubik.className} antialiased selection:bg-gray-500 selection:text-white w-full min-h-screen flex justify-center items-center flex-col bg-gradient-to-br from-white via-gray-100 to-gray-50`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
