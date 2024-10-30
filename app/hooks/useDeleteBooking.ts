import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useHandleUnAuthorisedResponse } from "../utils/utils";
import { deleteBooking } from "../_lib/data-service";

interface DeleteBookingVariables {
  bookingId: string;
  token: string | null;
}

interface DeleteBookingData {
  status: string;
}

interface UseCustomMutationReturn<TData, TVariables> {
  mutate: UseMutateFunction<
    TData,
    { error: Error; statusCode: string },
    TVariables,
    unknown
  >;
  isPending: boolean;
}

export default function useDeleteBookings<
  TData extends DeleteBookingData = DeleteBookingData,
  TVariables extends DeleteBookingVariables = DeleteBookingVariables
>(): UseCustomMutationReturn<TData, TVariables> {
  const queryClient = useQueryClient();
  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const { mutate, isPending } = useMutation<
    TData,
    { error: Error; statusCode: string },
    TVariables
  >({
    mutationFn: async (variables: TVariables) => {
      const { bookingId, token } = variables;
      // Cast the result as TData
      return deleteBooking({ bookingId, token }) as Promise<TData>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(`Booking successfully deleted`);
    },
    onError: (err: any) => {
      toast.error(err.message);

      handleUnAuthorisedResponse(err.statusCode);
    },
  });

  return { mutate, isPending };
}
