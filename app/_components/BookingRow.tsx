import { isToday, format } from "date-fns";
import { Booking } from "../utils/types";
import { formatCurrency } from "../utils/helpers";
import Tag from "./Tag";
import Row from "./Row";

export function BookingRow({ booking }: { booking: Booking }) {
  const {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest: { fullName, email },
    cabin: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  type Status = keyof typeof statusToTagName; // "unconfirmed" | "checked-in" | "checked-out"

  function getTagName(status: string): string {
    return statusToTagName[status as Status];
  }

  return (
    <Row>
      <div className="font-semibold">{cabinName}</div>
      <div className="flex flex-col gap-[.2rem]">
        <span className="font-medium">{fullName}</span>
        <span className="text-[1.2rem] text-[var(--color-grey-500)]">
          {email}
        </span>
      </div>

      <div className="flex flex-col gap-[.2rem]">
        <span className="font-medium">
          {isToday(new Date(startDate)) ? "Today" : "Yesterday"} &rarr;{" "}
          {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={getTagName(status)}>{status.replace("-", " ")}</Tag>
      <div>{formatCurrency(totalPrice)}</div>
    </Row>
  );
}
