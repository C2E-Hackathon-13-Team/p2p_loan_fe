import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ImageBackground from './bg/picbg';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "P2P Loan",
  description: "Generated by create next app",
  icons: {
    icon: '/image/favicon.ico', 
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <ImageBackground></ImageBackground>
 

        {children}
      </body>
    </html>
  );
}
