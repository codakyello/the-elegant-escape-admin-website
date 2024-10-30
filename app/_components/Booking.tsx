"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { ModalOpen, ModalWindow } from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { Settings } from "../utils/types";
import BookingDataBox from "./BookingDataBox";
import useBooking from "../hooks/useBooking";
import SpinnerFull from "./SpinnerFull";
import { toast } from "sonner";
import { useAuth } from "../_contexts/AuthProvider";
import useDeleteBookings from "../hooks/useDeleteBooking";

export default function Booking({
  settings,
  bookingId,
}: {
  settings: Settings;
  bookingId: string;
}) {
  const router = useRouter();
  const { getToken } = useAuth();
  const token = getToken();
  const { isLoading, data: booking, error } = useBooking(bookingId);

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBookings();

  if (isLoading) return <SpinnerFull />;
  if (error) return toast.error(error.message);

  return (
    <Box className="flex flex-col gap-8 px-[2rem] py-[4rem]">
      <BookingDataBox booking={booking} settings={settings} />
      <Box className="flex justify-end gap-5">
        {booking?.status === "unconfirmed" && (
          <Button
            type="primary"
            onClick={() => {
              router.push(`/dashboard/checkin/${bookingId}`);
            }}
          >
            Check in
          </Button>
        )}

        <ModalOpen name="delete-booking">
          <Button type="danger">Delete booking</Button>
        </ModalOpen>

        <ModalWindow name="delete-booking">
          <ConfirmDelete
            resourceName="Booking"
            isDeleting={isDeleting}
            onConfirm={async () => {
              await deleteBooking({
                token,
                bookingId,
              });
            }}
          />
        </ModalWindow>
        <Button onClick={() => router.back()} type="cancel">
          Back
        </Button>
      </Box>
    </Box>
  );
}
