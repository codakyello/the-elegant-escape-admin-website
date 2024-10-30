"use client";
import { isToday, format } from "date-fns";
import { Booking } from "../utils/types";
import {
  formatCurrency,
  formatDistanceFromNow,
  getTagName,
} from "../utils/helpers";
import Tag from "./Tag";
import Row from "./Row";
import Menus from "./Menu";
import { HiEllipsisVertical, HiEye, HiTrash } from "react-icons/hi2";
import { useState } from "react";
import { getToken } from "../utils/serverUtils";
import { deleteBooking, updateBooking } from "../_lib/data-service";
import {
  showToastMessage,
  useHandleUnAuthorisedResponse,
} from "../utils/utils";
import { ModalOpen, ModalWindow } from "./Modal";
import Link from "next/link";
import ConfirmDelete from "./ConfirmDelete";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function BookingRow({ booking }: { booking: Booking }) {
  const {
    bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest: { fullName, email },
    cabin: { name: cabinName },
  } = booking;

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const handleDelete = async function () {
    setLoading(true);

    const token = await getToken();

    const res = await deleteBooking(bookingId, token);

    handleUnAuthorisedResponse(res.statusCode);

    showToastMessage(res.status, res.message, "Booking successfully deleted");

    setLoading(false);
  };
  const handleCheckOut = async function () {
    setLoading(true);
    const token = await getToken();
    if (!token) return;
    const result = await updateBooking(token, bookingId, {
      status: "checked-out",
    });

    showToastMessage(
      result.status,
      result.message,
      "Booking successfully checked out"
    );
    setLoading(false);
  };
  return (
    <Row>
      <Box className="font-semibold">{cabinName}</Box>
      <Box className="flex flex-col gap-[.2rem]">
        <span className="font-medium">{fullName}</span>
        <span className="text-[1.2rem] text-[var(--color-grey-500)]">
          {email}
        </span>
      </Box>

      <Box className="flex flex-col gap-[.2rem]">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Box>

      <Tag type={getTagName(status)}>{status.replace("-", " ")}</Tag>
      <Box>{formatCurrency(totalPrice)}</Box>

      <Box className="relative ">
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
            <Link href={`/dashboard/bookings/${bookingId}`}>See details</Link>
          </Menus.Button>

          {status !== "checked-out" ? (
            <Menus.Button
              icon={
                <HiEye className=" w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
              }
              onClick={() => {
                if (status === "unconfirmed") {
                  router.push(`/dashboard/checkin/${bookingId}`);
                } else {
                  handleCheckOut();
                }
              }}
              disabled={loading}
            >
              {status === "unconfirmed" ? "Check in" : "Check out"}
            </Menus.Button>
          ) : (
            ""
          )}

          <ModalOpen name="delete-booking">
            <Menus.Button
              onClick={() => {}}
              icon={
                <HiTrash className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
              }
              disabled={loading}
            >
              Delete booking
            </Menus.Button>
          </ModalOpen>

          <ModalWindow name="delete-booking">
            <ConfirmDelete
              resourceName="Booking"
              isDeleting={loading}
              onConfirm={handleDelete}
            />
          </ModalWindow>
        </Menus.Menu>
      </Box>
    </Row>
  );
}
