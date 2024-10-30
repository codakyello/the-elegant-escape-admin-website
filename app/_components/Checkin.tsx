"use client";
import { Box } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import Button from "./Button";

import { Settings } from "../utils/types";
import BookingDataBox from "./BookingDataBox";
import Input from "./Input";
import { useState } from "react";
import { updateBooking } from "../_lib/data-service";
import { getToken } from "../utils/serverUtils";
import SpinnerMini from "./SpinnerMini";
import { showToastMessage } from "../utils/utils";
import { formatCurrency } from "../utils/helpers";
import useBooking from "../hooks/useBooking";
import useCustomMutation from "../hooks/useCustomMutation";
import SpinnerFull from "./SpinnerFull";
import { toast } from "sonner";
import { useAuth } from "../_contexts/AuthProvider";

export default function CheckIn({
  bookingId,
  settings,
}: {
  bookingId: string;
  settings: Settings;
}) {
  const router = useRouter();
  const { getToken } = useAuth();
  const token = getToken();
  const { isLoading, error, data: booking } = useBooking(bookingId);
  const {
    status,
    numNights,
    numGuests,
    totalPrice,
    hasBreakfast,
    guest: { fullName } = {},
  } = booking || {};
  const { breakFastPrice } = settings;

  const { mutate: checkIn, isPending: isCheckingIn } =
    useCustomMutation(updateBooking);

  const [breakFast, setBreakFast] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const totalBreakfastPrice = breakFastPrice * numGuests * numNights;

  const totalBookingPrice = breakFast
    ? totalPrice + totalBreakfastPrice
    : totalPrice;

  // const handleCheckIn = async function () {
  //   if (!confirm) return;

  //   setLoading(true);
  //   const token = await getToken();
  //   if (!token) return;
  //   const result = await updateBooking({ token, id: bookingId, obj });

  //   showToastMessage(
  //     result.status,
  //     result.message,
  //     "Booking successfully checked in"
  //   );
  //   setLoading(false);
  // };

  if (isLoading) return <SpinnerFull />;
  if (error) return toast.error(error.message);
  return (
    <Box className="flex flex-col gap-8 px-[2rem] py-[4rem]">
      <BookingDataBox booking={booking} settings={settings} />
      {status.toLowerCase() === "unconfirmed" && (
        <>
          {!hasBreakfast && (
            <Box className="flex items-center gap-5 bg-[var(--color-grey-0)] py-[2.4rem] px-[4rem] rounded-[var(--border-radius-md)]">
              <Input
                onChange={() => {
                  setBreakFast((state) => !state);
                  setConfirm(false);
                }}
                checked={breakFast}
                className="w-[2rem] h-[2rem]"
                type="checkbox"
                name="hasBreakFast"
                id="addBreakfast"
              />
              <label htmlFor="addBreakfast">
                Want to add breakfast for {formatCurrency(totalBreakfastPrice)}?
              </label>
            </Box>
          )}

          <Box className="flex items-center gap-5 bg-[var(--color-grey-0)] py-[2.4rem] px-[4rem] rounded-[var(--border-radius-md)]">
            <Input
              disabled={confirm && breakFast}
              onChange={() => setConfirm((state) => !state)}
              checked={confirm}
              className="w-[2rem] h-[2rem]"
              type="checkbox"
              name="confirm"
              id="confirm"
            />
            <label htmlFor="confirm">
              I confirm that {fullName} has paid the total amount of{" "}
              {formatCurrency(totalBookingPrice)}{" "}
              {breakFast &&
                `(${formatCurrency(totalPrice)} + ${formatCurrency(
                  totalBreakfastPrice
                )})`}
            </label>
          </Box>
        </>
      )}

      <Box className="flex justify-end gap-5">
        {status === "unconfirmed" && (
          <Button
            disabled={isCheckingIn || !confirm}
            type="primary"
            onClick={() => {
              const obj = {
                status: "checked-in",
                totalPrice: totalBookingPrice,
                hasBreakfast: breakFast,
              };
              checkIn(
                {
                  token,
                  id: bookingId,
                  obj,
                },
                {
                  onSuccess: () => {
                    toast.success(`Booking successfully checked in`);
                  },
                }
              );
            }}
          >
            {!isCheckingIn ? "Check in booking" : <SpinnerMini />}
          </Button>
        )}

        <Button onClick={() => router.back()} type="cancel">
          Back
        </Button>
      </Box>
    </Box>
  );
}
