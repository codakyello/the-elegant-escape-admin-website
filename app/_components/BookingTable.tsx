"use client";

import Table, { Body, Footer, Header } from "./Table";
import { Booking } from "../utils/types";
import { BookingRow } from "./BookingRow";
import Pagination from "./Pagination";
import { RESULTS_PER_PAGE } from "../utils/constants";

export default function BookingTable({
  bookings,
  count,
}: {
  bookings: Booking[];
  count: string;
}) {
  console.log(count);
  return (
    <Table columns={["0.6fr, 2fr, 2.4fr, 1.4fr, 1fr, 3.2rem"]}>
      <Header headers={["Cabin", "Guest", "Dates", "Status", "Amount"]} />
      <Body
        data={bookings}
        render={(booking) => <BookingRow booking={booking} key={booking._id} />}
      />
      <Footer>
        {Number(count) > RESULTS_PER_PAGE ? <Pagination count={count} /> : ""}
      </Footer>
    </Table>

    // <Box className="border border-[var(--color-grey-200)] bg-[var(--color-grey-0)] text-[1.4rem]">
    //   <header className="grid gap-[2.4rem] grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-50)] border-b-[var(--color-grey-100)]">
    //     <div className="uppercase font-semibold">Cabin</div>
    //     <div className="uppercase font-semibold">Guest</div>
    //     <div className="uppercase font-semibold">Dates</div>
    //     <div className="uppercase font-semibold">Status</div>
    //     <div className="uppercase font-semibold">Amount</div>
    //   </header>

    //   <Box>
    //     {bookings.map((booking) => (
    //       <BookingRow booking={booking} key={booking._id} />
    //     ))}
    //   </Box>
    // </Box>
  );
}
