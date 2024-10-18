"use client";
import { Box } from "@chakra-ui/react";
// import useOutsideClick from "@/app/hooks/useOutsideClick";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

const ModalContext = createContext<
  | { isOpen: string; open: (name: string) => void; close: () => void }
  | undefined
>(undefined);

export default function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState("");
  const open = setOpen;
  const close = () => setOpen("");
  //   useOutsideClick(close);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalOpen({
  children,
  name,
}: {
  children: ReactElement;
  name: string;
}) {
  const context = useContext(ModalContext);

  if (!context) return;

  const { open } = context;
  return cloneElement(children, {
    onClick: () => {
      open(name);
    },
  });
}

export function ModalWindow({
  children,
  name,
}: {
  children: ReactElement;
  name: string;
}) {
  const context = useContext(ModalContext);

  if (!context) return;

  const { isOpen } = context;

  return isOpen === name ? (
    <Box className="fixed top-0 left-0 z-20 flex items-center justify-center h-full w-screen backdrop-blur-sm">
      {children}
    </Box>
  ) : (
    ""
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("You cannot use modal context outside its provider");

  return context;
}
