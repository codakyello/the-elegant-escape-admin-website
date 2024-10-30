import Booking from "@/app/_components/Booking";
import CheckIn from "@/app/_components/Checkin";
import { getBooking, getSettings } from "@/app/_lib/data-service";
import { getToken } from "@/app/utils/serverUtils";

export const metadata = {
  title: "Booking",
};

async function Page({ params }: { params: { bookingId: string } }) {
  const bookingId = params.bookingId;

  const settings = await getSettings();

  return <CheckIn bookingId={bookingId} settings={settings} />;
}

export default Page;
