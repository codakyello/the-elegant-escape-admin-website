import { Box } from "@chakra-ui/react";
import Stats from "./Stats";
import { getToken } from "../utils/serverUtils";
import { getAllCabins, getBookingAfterDate } from "../_lib/data-service";
import TodayActivities from "./TodayActivities";

export default async function DashboardLayout({ last }: { last: string }) {
  const token = await getToken();
  const numDays = Number(last);
  const [bookings, data] = await Promise.all([
    getBookingAfterDate(token, numDays || 7),
    getAllCabins(),
  ]);

  return (
    <>
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-[2.4rem] ">
        <Stats
          bookings={bookings}
          cabinCount={data.totalCount}
          numDays={numDays}
        />
      </Box>
      <Box className="grid md:grid-cols-2 grid-cols-1 gap-[2.4rem] ">
        <Box className="bg-[var(--color-grey-0)] flex flex-col gap-8 overflow-scroll no-scrollbar h-[30rem] pt-[2.4rem] pb-[3.2rem] px-[3.2rem]">
          <h2>Today</h2>
          <TodayActivities bookings={bookings} />
        </Box>
        <Box className="bg-[var(--color-grey-0)]">Stay duration summary</Box>
        <Box className="bg-[var(--color-grey-0)] col-span-full h-[45rem]">
          Graph
        </Box>
      </Box>
    </>
  );
}
