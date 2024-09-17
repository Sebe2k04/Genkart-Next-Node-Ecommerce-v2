import { Inter } from "next/font/google";
import "./globals.css";
import UserAuth from "@/components/secure/UserAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import Navbar from "@/components/Navbar";
import NavbarHandler from "@/components/NavbarHandler";
import DataProvider from "@/context/GlobalProvider";
// axios.defaults.withCredentials = true;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genkart",
  description: "Shop the best casuals and t-shirts at Genkart. Latest fashion trends in comfortable clothing , Explore Genkart's tech projects on Next.js, Node.js, and full-stack development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
    </head>
      <body className={inter.className}>
        <DataProvider>
          <NavbarHandler />
          {children}
          <ToastContainer />
          <UserAuth/>
        </DataProvider>
      </body>
    </html>
  );
}
