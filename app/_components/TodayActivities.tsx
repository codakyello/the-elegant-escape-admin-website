"use client";
import { Booking } from "../utils/types";

import Activity from "./Activity";

export default function TodayActivities({ bookings }: { bookings: Booking[] }) {
  // activity ending today that is not already checkedout
  // filter all the checked out ones
  const todayActivity = bookings.filter(
    (booking) => booking.status !== "checked-out"
  );

  console.log(bookings.length);

  if (bookings.length) {
    return (
      <ul className="no-scrollbar ">
        {todayActivity.map((activity) => (
          <Activity key={activity.bookingId} activity={activity} />
        ))}
      </ul>
    );
  } else {
    return <p>No Recent Activity</p>;
  }
}
