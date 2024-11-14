"use client";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../_contexts/DarkModeProvider";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className="p-2 hover:bg-[var(--color-grey-100)] font-semibold rounded-md"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <HiOutlineSun className=" text-[2.5rem] text-[var(--color-brand-600)]" />
      ) : (
        <HiOutlineMoon className=" text-[2.5rem] text-[var(--color-brand-600)]" />
      )}
    </button>
  );
}
