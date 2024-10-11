import { ReactNode } from "react";

function FormRow({
  label,
  children,
  htmlFor,
  orientation = "vertical",
}: {
  label: string;
  htmlFor: string;
  orientation?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid ${
        orientation === "vertical"
          ? "gap-[.8rem]"
          : "grid-cols-[24rem_.45fr] gap-[2.4rem] items-center"
      }  py-[1.2rem] border-b border-[var(--color-grey-100)]`}
    >
      <label className={`font-medium`} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormRow;
