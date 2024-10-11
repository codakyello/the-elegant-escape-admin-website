import SpinnerMini from "./SpinnerMini";

export default function Button({
  loading,
  children,
  type,
  handleClick,
  action = "button",
}: {
  loading?: boolean;
  children: string;
  type: "cancel" | "primary" | "secondary";
  action?: "submit" | "button";
  handleClick?: () => void;
}) {
  return (
    <button
      type={action}
      onClick={handleClick}
      className={`flex justify-center btn btn--${type}`}
    >
      {loading ? <SpinnerMini /> : children}
    </button>
  );
}
