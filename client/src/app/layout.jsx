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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
