import AuthProvider from "@/context/AuthProvider";
import "../globals.css";

export default function LiveLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
