function Page({ params }) {
  const bookingId = params.bookingId;

  return <div>{bookingId}</div>;
}

export default Page;
