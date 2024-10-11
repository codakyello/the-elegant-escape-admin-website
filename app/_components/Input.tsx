function Input({
  name,
  id,
  type,
  placeholder,
  required,
  defaultValue,
  handleBlur,
  disabled,
}: {
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="py-[1rem] text-[1.4rem] md:text-[16px] px-[1.2rem] bg-white border rounded-[var(--border-radius-sm)]"
      name={name}
      type={type}
      id={id}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
}

export default Input;
