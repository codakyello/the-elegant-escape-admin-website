import { toast } from "sonner";

export function handleUnAuthorisedResponse(
  setUser: (arg: null) => void,
  data: {
    statusCode?: number;
    token?: string;
    user?: { token: string };
    status?: string;
    message?: string;
  }
) {
  if (data?.statusCode === 401) {
    setUser(null);
  }
}

export function showToastMessage(
  result: {
    statusCode?: number;
    token?: string;
    user?: { token: string };
    status?: string;
    message?: string;
  },
  successMessage: string
) {
  if (result.status === "error") {
    toast.error(result.message);
  } else {
    toast.success(successMessage);
  }
}
