import { getBookings } from "@/app/_lib/data-service";
import { getToken } from "@/app/serverUtils";
import Link from "next/link";

export const metadata = {
  title: "Bookings",
};

type Booking = {
  guest: { fullName: string };
  _id: string;
  cabin: { name: string };
};

async function Page() {
  const token = await getToken();
  const bookings = await getBookings(token);

  if (!bookings.length) return <h1>No Bookings Found!</h1>;
  return (
    <ul>
      {bookings.map((booking: Booking) => (
        <li key={booking._id}>
          <Link href={`/dashboard/bookings/${booking._id}`}>
            <span>{booking.guest.fullName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Page;
