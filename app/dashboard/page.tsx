import { Box } from "@chakra-ui/react";
import Filter from "@/app/_components/Filter";
import DashboardLayout from "../_components/DashboardLayout";
import Loading from "../loading";
import { getAllCabins } from "../_lib/data-service";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

async function Page() {
  const data = await getAllCabins();
  const cabinCount = data.totalCount;

  return (
    <Box className="flex flex-col gap-[3.2rem]">
      <Box className="flex flex-col md:flex-row justify-between">
        <h1 className="mb-8 md:mb-0">Dashboard</h1>

        <Filter
          filters={[
            { name: "Last 7 days", value: "7" },
            { name: "Last 30 days", value: "30" },
            { name: "Last 90 days", value: "90" },
          ]}
          paramName="last"
          defaultValue="7"
          className="w-[35rem]"
        />
      </Box>

      <Suspense fallback={<Loading />}>
        <DashboardLayout cabinCount={cabinCount} />
      </Suspense>
    </Box>
  );
}

export default Page;
