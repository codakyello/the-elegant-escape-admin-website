"use client";
import { isToday, format } from "date-fns";
import { Booking } from "../utils/types";
import { formatCurrency } from "../utils/helpers";
import Tag from "./Tag";
import Row from "./Row";
import Menus from "./Menu";
import { HiEllipsisVertical, HiEye, HiTrash } from "react-icons/hi2";
import { useState } from "react";
import { getToken } from "../utils/serverUtils";
import { deleteBooking } from "../_lib/data-service";
import {
  showToastMessage,
  useHandleUnAuthorisedResponse,
} from "../utils/utils";
import { useModal } from "./Modal";

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

type Status = keyof typeof statusToTagName; // "unconfirmed" | "checked-in" | "checked-out"

function getTagName(status: string): string {
  return statusToTagName[status as Status];
}

export function BookingRow({ booking }: { booking: Booking }) {
  const {
    _id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest: { fullName, email },
    cabin: { name: cabinName },
  } = booking;

  const { close: closeModal } = useModal();

  const [loading, setLoading] = useState(false);

  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const handleDelete = async function () {
    setLoading(true);

    const token = await getToken();

    const res = await deleteBooking(bookingId, token);

    handleUnAuthorisedResponse(res.statusCode);

    showToastMessage(res.status, res.message, "Booking successfully deleted");

    setLoading(false);

    closeModal();
  };
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

      <div className="relative ">
        <Menus.Toogle id={bookingId}>
          <button className="bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 hover:bg-gray-100">
            <HiEllipsisVertical className="self-end h-10 w-10" />
          </button>
        </Menus.Toogle>

        <Menus.Menu id={bookingId}>
          <Menus.Button
            icon={
              <HiEye className=" w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
            onClick={() => {}}
            disabled={loading}
          >
            See details
          </Menus.Button>

          <Menus.Button
            icon={
              <HiEye className=" w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
            onClick={() => {}}
            disabled={loading}
          >
            Check in
          </Menus.Button>

          <Menus.Button
            icon={
              <HiTrash className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
            onClick={handleDelete}
            disabled={loading}
          >
            Delete booking
          </Menus.Button>
        </Menus.Menu>
      </div>
    </Row>
  );
}
