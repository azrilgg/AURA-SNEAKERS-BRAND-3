import { Oswald, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "AURA SNEAKERS — Elite Football Heritage Collection",
  description:
    "Six legendary football clubs. Six iconic sneakers. Each pair carries decades of glory, passion, and heritage — crafted for the elite, designed for the faithful.",
  keywords:
    "sneakers, football, FC Barcelona, Real Madrid, Liverpool, Chelsea, Arsenal, AC Milan, limited edition",
  openGraph: {
    title: "AURA SNEAKERS — Elite Football Heritage Collection",
    description:
      "Where football heritage meets premium streetwear. Six legendary clubs, six iconic designs.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
