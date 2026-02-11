import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import YandexMetrika from "./components/YandexMetrika/YandexMetrika";

const geistSans = localFont({
  src: [
    {
      path: "./fonts/Gilroy-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Gilroy-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <YandexMetrika />
      </head>
      <body className={`${geistSans.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
