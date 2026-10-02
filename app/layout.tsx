import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio • Sulyman",
  description:
    "Software Engineer building fast, real-time web interfaces with React & Next.js. An interactive digital experience, not a traditional portfolio.",
  metadataBase: new URL("https://sulymanlive.netlify.app"),
  openGraph: {
    title: "Portfolio • Sulyman",
    description: "Software Engineer building fast, real-time web interfaces with React & Next.js.",
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
