import { ReactNode } from "react";
import SpinnerMini from "./SpinnerMini";

export default function Button({
  loading,
  children,
  type,
  onClick,
  action = "button",
}: {
  loading?: boolean;
  children: ReactNode;
  type: "cancel" | "primary" | "secondary" | "danger";
  action?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      disabled={loading}
      type={action}
      onClick={onClick}
      className={`flex justify-center btn btn--${type}`}
    >
      {loading ? <SpinnerMini /> : children}
    </button>
  );
}
