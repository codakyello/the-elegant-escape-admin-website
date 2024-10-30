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
import {
  deleteBooking as deleteBookingApi,
  updateBooking,
} from "../_lib/data-service";
import {
  showToastMessage,
  useHandleUnAuthorisedResponse,
} from "../utils/utils";
import { ModalOpen, ModalWindow, useModal } from "./Modal";
import Link from "next/link";
import ConfirmDelete from "./ConfirmDelete";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useCustomMutation from "../hooks/useCustomMutation";
import { toast } from "sonner";
import { useAuth } from "../_contexts/AuthProvider";
import useDeleteBookings from "../hooks/useDeleteBooking";

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

  const { getToken } = useAuth();
  const token = getToken();
  const { close } = useModal();

  const router = useRouter();

  const { mutate: checkOut, isPending: isCheckingOut } =
    useCustomMutation(updateBooking);

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBookings();

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
            disabled={isCheckingOut || isDeleting}
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
                  checkOut(
                    {
                      token,
                      id: bookingId,
                      obj: { status: "unconfirmed" },
                    },
                    {
                      onSuccess: () => {
                        toast.success(`Booking successfully checked out`);
                      },
                    }
                  );
                }
              }}
              disabled={isCheckingOut || isDeleting}
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
              disabled={isCheckingOut || isDeleting}
            >
              Delete booking
            </Menus.Button>
          </ModalOpen>

          <ModalWindow name="delete-booking">
            <ConfirmDelete
              resourceName="Booking"
              isDeleting={isDeleting}
              onConfirm={async () => {
                await deleteBooking(
                  {
                    token,
                    bookingId,
                  },
                  {
                    onSuccess: () => {
                      close();
                    },
                  }
                );
              }}
            />
          </ModalWindow>
        </Menus.Menu>
      </Box>
    </Row>
  );
}
