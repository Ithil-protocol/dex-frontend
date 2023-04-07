import { Cormorant } from "next/font/google";

export const outfit = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  preload: true,
  display: "block",
});
