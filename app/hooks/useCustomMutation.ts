import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseMutateFunction,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useHandleUnAuthorisedResponse } from "../utils/utils";
import AppError from "../utils/AppError";

type MutationFunction<TData, TVariables> = (
  variables: TVariables
) => Promise<TData>;

interface UseCustomMutationReturn<TData, TVariables> {
  mutate: UseMutateFunction<
    TData,
    { error: Error; statusCode: string },
    TVariables,
    unknown
  >;
  isPending: boolean;
}

export default function useCustomMutation<TData = unknown, TVariables = void>(
  mutateFn: MutationFunction<TData, TVariables>
): UseCustomMutationReturn<TData, TVariables> {
  const queryClient = useQueryClient();
  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      console.log("invalidated");
      queryClient.invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message);

      handleUnAuthorisedResponse(err.statusCode);
    },
  });

  return { mutate, isPending };
}
