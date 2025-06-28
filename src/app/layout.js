import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "bridgingsilence",
  description: "bridging silence is a blog about bridging the gap between technology and humanity.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 w-full`}
      >
        {/* Global wrapper with negative margins to combat any default spacing */}
        <div className="overflow-x-hidden w-screen max-w-[100vw] mx-[-1px]">
          {children}
        </div>
      </body>
    </html>
  );
}
