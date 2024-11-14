"use client";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function NavToggle() {
  return (
    <button
      className="md:hidden flex bg-[var(--color-grey-50)] h-16 items-center justify-center rounded-[var(--border-radius-md)] aspect-square"
      onClick={() => {
        document.body.classList.toggle("open");
      }}
    >
      <HamburgerIcon
        color={"--color-brand-600"}
        h={20}
        w={20}
        className="text-[var(--color-brand-600)]"
      />
    </button>
  );
}
