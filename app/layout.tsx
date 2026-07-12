import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sulyman Khalil — Entering Sulyman",
  description:
    "Sulyman Khalil — Frontend Engineer building real-time and video-streaming interfaces. An interactive digital experience, not a traditional portfolio.",
  metadataBase: new URL("https://sulymanlive.netlify.app"),
  openGraph: {
    title: "Entering Sulyman",
    description: "Frontend Engineer — real-time & video-streaming interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased font-body">
        {children}
        <div className="noise-layer" />
      </body>
    </html>
  );
}
