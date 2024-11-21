import type { Metadata } from "next";
import Web3Modal from "@/context/Web3Modal";

import "./style.css";


export const metadata: Metadata = {
  title: "Numa App",
  description: "Numa App",
  icons: {
    icon: '/images/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon"></link>
      <Web3Modal>
        <body>{children}</body>
      </Web3Modal>
    </html>
  );
}
