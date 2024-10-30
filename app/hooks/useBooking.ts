import { getBooking } from "../_lib/data-service";
import { useAuth } from "../_contexts/AuthProvider";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function useBooking(bookingId: string) {
  console.log("This is booking id", bookingId);
  const { getToken } = useAuth();
  const token = getToken();

  const { data, error, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId, token),
  });

  console.log(data);
  return { data, error, isLoading };
}
