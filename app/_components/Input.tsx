function Input({
  name,
  id,
  type,
  placeholder,
  required,
  defaultValue,
  handleBlur,
  disabled,
  checked,
  onChange,
  value,
}: {
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  checked?: boolean;
  value?: string | number;
  onChange?: () => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="py-[1rem] md:text-[16px] px-[1.2rem] bg-white border rounded-[var(--border-radius-sm)]"
      name={name}
      type={type}
      id={id}
      value={value}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Input;
