import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_contexts/AuthProvider";
import QueryProvider from "./_contexts/QueryProvider";
import { DarkModeProvider } from "./_contexts/DarkModeProvider";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

const poppins = Poppins({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
});

// const sono = Sono({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // Specify the font weights you need
// });

export const metadata = {
  title: {
    template: "%s |  The Elegant Escape",
    default: "The Elegant Escape",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="lg:text-[62.5%] md:text-[56.25%] text-[50%]" lang="en">
      <body className={`${poppins.className} `}>
        <ChakraProvider>
          <QueryProvider>
            <DarkModeProvider>
              <AuthProvider>{children}</AuthProvider>
            </DarkModeProvider>
          </QueryProvider>
        </ChakraProvider>
      </body>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
              fontSize: "16px",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
              fontSize: "16px",
            },
          },
        }}
      />
    </html>
  );
}
