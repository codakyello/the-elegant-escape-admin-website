import BookingTable from "@/app/_components/BookingTable";
import Filter from "@/app/_components/Filter";
import Sort from "@/app/_components/Sort";
import { getBookings } from "@/app/_lib/data-service";
import { getToken } from "@/app/utils/serverUtils";
import { Box } from "@chakra-ui/react";

export const metadata = {
  title: "Bookings",
};

// type Booking = {
//   guest: { fullName: string };
//   _id: string;
//   cabin: { name: string };
// };

async function Page() {
  const token = await getToken();
  const bookings = await getBookings(token);

  if (!bookings.length) return <h1>No Bookings Found!</h1>;
  return (
    <Box className="flex flex-col gap-5">
      <Box className="grid-cols-[1fr_1fr] grid lg:grid-cols-[repeat(3,auto)] gap-8">
        <h1 className="col-span-2 lg:col-span-1 ">All Bookings</h1>
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

      <BookingTable bookings={bookings} />
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
