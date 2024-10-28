import { getAllBookings } from "../_lib/data-service";
import { getToken } from "../utils/serverUtils";
import BookingTable from "./BookingTable";

export default async function Bookings({
  searchParams,
}: {
  searchParams: { page: string; status: string; sortBy: string };
}) {
  const token = await getToken();
  const data = await getAllBookings(token, searchParams);
  const bookings = data.bookings;
  const count = data.totalCount;

  return bookings.length ? (
    <BookingTable count={count} bookings={bookings} />
  ) : (
    <h1 className="mt-5">No Bookings Found</h1>
  );
}
