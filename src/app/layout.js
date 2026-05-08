import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Self Sustainable OFF Grid Farming Solution | Ahmro Global & ARB Farms",
  description: "Professional farm cost and layout planning tool for modern agricultural projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>{children}</body>
    </html>
  );
}
