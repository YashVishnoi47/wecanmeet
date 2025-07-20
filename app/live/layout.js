import "../globals.css";

export default function LiveLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
