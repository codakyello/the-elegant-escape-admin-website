import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "./_contexts/AuthProvider";

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
    template: "%s /  The Elegant Escape",
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
        <AuthProvider>{children}</AuthProvider>
      </body>
      <Toaster
        theme={"light"}
        richColors
        position="top-center"
        offset="8px"
        closeButton={true}
        toastOptions={{
          duration: 3500,
          classNames: {
            title: "text-[1.6rem]",
          },
        }}
      />
    </html>
  );
}
