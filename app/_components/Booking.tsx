"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Modal, { ModalOpen, ModalWindow } from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import {
  showToastMessage,
  useHandleUnAuthorisedResponse,
} from "../utils/utils";
import { deleteBooking } from "../_lib/data-service";
import { getToken } from "../utils/serverUtils";
import { useState } from "react";
import { Booking as BookingType, Settings } from "../utils/types";
import BookingDataBox from "./BookingDataBox";

export default function Booking({
  booking,
  settings,
}: {
  booking: BookingType;
  settings: Settings;
}) {
  const { bookingId, status } = booking;
  const router = useRouter();
  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();
  const [loading, setLoading] = useState(false);

  const handleDelete = async function () {
    setLoading(true);

    const token = await getToken();

    const res = await deleteBooking(bookingId, token);

    if (res.status === "success") router.push("/dashboard/bookings");

    handleUnAuthorisedResponse(res.statusCode);

    showToastMessage(res.status, res.message, "Booking successfully deleted");

    setLoading(false);
  };
  return (
    <Modal>
      <Box className="flex flex-col gap-8 px-[2rem] py-[4rem]">
        <BookingDataBox booking={booking} settings={settings} />
        <Box className="flex justify-end gap-5">
          {status === "unconfirmed" && (
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
              isDeleting={loading}
              onConfirm={handleDelete}
            />
          </ModalWindow>
          <Button onClick={() => router.back()} type="cancel">
            Back
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
