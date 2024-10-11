import { Box } from "@chakra-ui/react";
import Header from "../_components/Header";
import ProtectedRoute from "../_components/ProtectedRoute";
import SideBar from "../_components/SideBar";
import { ReactNode } from "react";

function Page({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Box className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] md:grid-cols-[26rem_1fr]">
        <SideBar />

        <Header />
        <main className="bg-[var(--color-grey-50)] p-5 md:pt-[4rem] md:pb-[6.4rem] md:px-[4.8rem]">
          <div className="max-w-[120rem] mx-auto ">{children}</div>
        </main>
      </Box>
    </ProtectedRoute>
  );
}

export default Page;
