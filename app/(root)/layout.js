import "../globals.css";

import { Rubik } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
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
          className={`${rubik.className} antialiased selection:bg-gray-500 selection:text-white`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
