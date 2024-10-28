"use client";

import Table, { Body, Footer, Header } from "./Table";
import { Booking } from "../utils/types";
import { BookingRow } from "./BookingRow";
import Pagination from "./Pagination";
import { RESULTS_PER_PAGE } from "../utils/constants";
import Modal from "./Modal";
import Menus from "./Menu";

export default function BookingTable({
  bookings,
  count,
}: {
  bookings: Booking[];
  count: number;
}) {
  return (
    <Modal>
      <Table columns={["0.6fr, 2fr, 2.4fr, 1.4fr, 1fr, 3.2rem"]}>
        <Header headers={["Cabin", "Guest", "Dates", "Status", "Amount"]} />
        <Body
          data={bookings}
          render={(booking) => (
            <Menus>
              <BookingRow booking={booking} key={booking._id} />
            </Menus>
          )}
        />
        <Footer>
          {Number(count) > RESULTS_PER_PAGE ? <Pagination count={count} /> : ""}
        </Footer>
      </Table>
    </Modal>
  );
}
