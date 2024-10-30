import { getBooking } from "../_lib/data-service";
import { useAuth } from "../_contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function useBooking(bookingId: string) {
  const { getToken } = useAuth();
  const token = getToken();

  const { data, error, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId, token),
  });

  console.log(data);
  return { data, error, isLoading };
}
