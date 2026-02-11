import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";

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
    <html lang="ru">
      <head>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(106779809, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
      </head>

      <body className={geistSans.variable}>
        <Header />
        {children}
        <Footer />

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106779809"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
