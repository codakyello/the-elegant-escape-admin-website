import { Box } from "@chakra-ui/react";
import Header from "../_components/Header";
import ProtectedRoute from "../_components/ProtectedRoute";
import SideBar from "../_components/SideBar";
import { ReactNode } from "react";

function Page({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Box className="grid overflow-x-hidden min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] md:grid-cols-[2rem_1fr]">
        <SideBar />
        <Header />
        <main className="md:ml-[23rem] ml-[5rem] w-[calc(100vw-7.5rem)] md:w-[calc(100vw-22rem)] mt-[6rem] min-h-[calc(100vh-7rem)] bg-[var(--color-grey-50)] px-6 pt-14 md:pt-[4rem] md:pb-[6.4rem] md:px-[4.8rem]">
          <div className="max-w-[120rem] mx-auto no-scroll overflow-auto">
            {children}
          </div>
        </main>
      </Box>
    </ProtectedRoute>
  );
}

export default Page;
