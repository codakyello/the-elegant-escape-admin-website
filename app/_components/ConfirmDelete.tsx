import { Box } from "@chakra-ui/react";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

export function ConfirmDelete({
  resourceName,
  onConfirm,
  onClose,
  isLoading,
}: {
  resourceName: string;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Box className="w-[40rem] px-[3.2rem] py-[4rem] shadow-lg rounded-[var(--border-radius-lg)] z-50 bg-[var(--color-grey-0)] flex flex-col gap-[1.2rem]">
      <h3>Delete {resourceName}</h3>
      <p className="mb-[1.2rem] text-[var(--color-grey-500)]">
        Are you sure you want to delete this cabins permanently? This action
        cannot be undone.
      </p>

      <Box className="justify-end gap-5  flex ">
        <Button onClick={onClose} type="cancel">
          Cancel
        </Button>
        <Button loading={isLoading} onClick={onConfirm} type="danger">
          {!isLoading ? "Delete" : <SpinnerMini />}
        </Button>
      </Box>
    </Box>
  );
}
