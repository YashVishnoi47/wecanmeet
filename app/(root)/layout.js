import "../globals.css";

export const metadata = {
  title: "Organised",
  description: "A minimalist Web-App for organising your Meetings ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
