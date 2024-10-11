export const metadata = {
  title: "Booking",
};

function Page({ params }) {
  const bookingId = params.bookingId;

  return <div>{bookingId}</div>;
}

export default Page;
