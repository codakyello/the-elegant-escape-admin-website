import Booking from "@/app/_components/Booking";
import { getBooking, getSettings } from "@/app/_lib/data-service";
import { getToken } from "@/app/utils/serverUtils";

export const metadata = {
  title: "Booking",
};

async function Page({ params }: { params: { bookingId: string } }) {
  const bookingId = params.bookingId;

  const token = await getToken();
  const [booking, settings] = await Promise.all([
    getBooking(bookingId, token),
    getSettings(),
  ]);

  return <Booking booking={booking} settings={settings} />;
}

export default Page;
