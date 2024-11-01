import { Box } from "@chakra-ui/react";
import { Booking } from "../utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { showToastMessage } from "../utils/utils";
import { useState } from "react";
import { getToken } from "../utils/serverUtils";
import { updateBooking } from "../_lib/data-service";
import SpinnerMini from "./SpinnerMini";
import Tag from "./Tag";
import { getTagName } from "../utils/helpers";
import useCheckOut from "../hooks/useCheckOut";

export default function Activity({ activity }: { activity: Booking }) {
  const router = useRouter();
  const {
    bookingId,
    status,
    numNights,
    guest: { fullName, countryFlag },
  } = activity;

  const { isPending: isCheckingOut, mutate: checkOut } = useCheckOut();
  //   setLoading(true);
  //   const token = await getToken();
  //   if (!token) return;
  //   const result = await updateBooking(token, bookingId, {
  //     status: "checked-out",
  //   });

  //   showToastMessage(
  //     result.status,
  //     result.message,
  //     "Booking successfully checked out"
  //   );
  //   setLoading(false);
  // };
  return (
    <li
      key={bookingId}
      className="flex gap-5 items-center py-[0.8rem] border-t border-b border-t-[var(--color-grey-100)] border-b-[var(--color-grey-100)]"
    >
      <Box className="w-[9rem]">
        <Tag type={getTagName(status)}>
          {activity.status === "unconfirmed" ? "arriving" : "departing"}
        </Tag>
      </Box>

      <Box className="relative w-[2rem] h-[1.2rem] aspect-square">
        <Image fill alt="country Flag" src={countryFlag} />
      </Box>
      <p className="text-[1.4rem] font-medium">{fullName}</p>
      <p className="text-[1.4rem] ml-auto w-[7rem]">{numNights} nights</p>
      <button
        onClick={() => {
          if (activity.status === "unconfirmed") {
            router.push(`/dashboard/checkin/${bookingId}`);
          } else {
            checkOut(bookingId); //checkout
          }
        }}
        className="uppercase w-[9rem] h-[2.6rem] flex items-center justify-center bg-[var(--color-brand-600)] font-semibold text-[1.2rem] border-none text-[var(--color-grey-0)] rounded-[var(--border-radius-sm)]"
      >
        {isCheckingOut ? (
          <SpinnerMini />
        ) : status === "unconfirmed" ? (
          "check in"
        ) : (
          "check out"
        )}
      </button>
    </li>
  );
}
