import Filter from "@/app/_components/Filter";
import Sort from "@/app/_components/Sort";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Loading from "../loading";
import Bookings from "@/app/_components/Bookings";

export const metadata = {
  title: "Bookings",
};

function Page({
  searchParams,
}: {
  searchParams: { page: string; status: string; sortBy: string };
}) {
  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex flex-col lg:flex-row gap-8 pt-1 pr-1">
        <h1 className="">All Bookings</h1>
        <Box className="flex gap-6 lg:ml-auto">
          <Filter
            defaultValue="all"
            paramName="status"
            className="lg:ml-auto"
            filters={[
              { name: "All", value: "all" },
              { name: "Checked-in", value: "checked-in" },
              { name: "Checked-out", value: "checked-out" },
              { name: "Unconfirmed", value: "unconfirmed" },
            ]}
          />

          <Sort
            defaultValue="startDate-desc"
            options={[
              { name: "Sort by date (recent first)", value: "startDate-desc" },
              { name: "Sort by date (earlier first)", value: "startDate-asc" },
              { name: "Sort by amount (high first)", value: "totalPrice-desc" },
              { name: "Sort by amount (low first)", value: "totalPrice-asc" },
            ]}
          />
        </Box>
      </Box>

      <Suspense
        fallback={<Loading />}
        key={`${searchParams.status}-${searchParams.sortBy}`}
      >
        <Bookings searchParams={searchParams} />
      </Suspense>
    </Box>
    /* {bookings.map((booking: Booking) => (
        <li key={booking._id}>
          <Link href={`/dashboard/bookings/${booking._id}`}>
            <span>{booking.guest.fullName}</span>
          </Link>
        </li>
      ))} */
  );
}

export default Page;
