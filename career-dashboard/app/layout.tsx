import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethan Jablonowski - Product, Growth & Operations",
  description: "Career portfolio showcasing 13+ years of building and scaling digital products across challenging markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${epilogue.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
