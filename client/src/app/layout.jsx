import { Inter } from "next/font/google";
import "./globals.css";
import UserAuth from "@/components/secure/UserAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarHandler from "@/components/NavbarHandler";
import DataProvider from "@/context/GlobalProvider";
import SEO from "@/components/seo/SEO";
import FooterHandler from "@/components/FooterHandler";
// axios.defaults.withCredentials = true;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genkart | Ecommerce",
  description:
    "Shop the best casuals and t-shirts at Genkart. Latest fashion trends in comfortable clothing , Explore Genkart's tech projects on Next.js, Node.js, and full-stack development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <SEO
          title="Genkart | Ecommerce"
          description="Discover the best casuals and T-shirts at Genkart, while exploring our full-stack projects built with Next.js, Node.js, Tailwind CSS, MongoDB, and more."
          keywords="Genkart, Casuals, T-shirts, Fashion, E-commerce, Next.js, Node.js, Full-Stack, Web Development, MongoDB, Tailwind CSS , sebe, sebe2k04,full stack project , ecommerce , genrio"
          image="/profile.png"
          author="sebe2k04"
          url={process.env.NEXT_PUBLIC_CLIENT_URL}
        />

        <DataProvider>
          <UserAuth />
          <NavbarHandler />
          {children}
          <ToastContainer />
          <FooterHandler />
        </DataProvider>
      </body>
    </html>
  );
}
