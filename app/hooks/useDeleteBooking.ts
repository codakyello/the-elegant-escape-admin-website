import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useHandleUnAuthorisedResponse } from "../utils/utils";
import { deleteBooking } from "../_lib/data-service";
import AppError from "../utils/AppError";

interface DeleteBookingVariables {
  bookingId: string;
  token: string | null;
}

interface DeleteBookingData {
  status: string;
}

interface UseCustomMutationReturn<TData, AppError, TVariables> {
  mutate: UseMutateFunction<TData, AppError, TVariables, unknown>;
  isPending: boolean;
}

export default function useDeleteBookings<
  TData extends DeleteBookingData = DeleteBookingData,
  TVariables extends DeleteBookingVariables = DeleteBookingVariables
>(): UseCustomMutationReturn<TData, AppError, TVariables> {
  const queryClient = useQueryClient();
  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const { mutate, isPending } = useMutation<TData, AppError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const { bookingId, token } = variables;
      return deleteBooking({ bookingId, token }) as Promise<TData>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(`Booking successfully deleted`);
    },
    onError: (err: AppError) => {
      toast.error(err.message);

      handleUnAuthorisedResponse(err.statusCode);
    },
  });

  return { mutate, isPending };
}
