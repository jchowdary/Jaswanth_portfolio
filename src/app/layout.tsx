import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Nalamothu Jaswanth | Creative Developer Portfolio",
  description: "High-end scrollytelling personal portfolio with Money Heist theme transition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script type="importmap">
          {`{
            "imports": {
              "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
              "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
            }
          }`}
        </script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#030303] text-[#f5f5f7]`}>
        {children}
      </body>
    </html>
  );
}
