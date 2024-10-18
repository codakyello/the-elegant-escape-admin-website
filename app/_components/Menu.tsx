"use client";

import {
  useContext,
  useState,
  createContext,
  ReactNode,
  cloneElement,
  ReactElement,
} from "react";
import { Box } from "@chakra-ui/react";
// import useOutsideClick from "../hooks/useOutsideClick";

type MenuContextType =
  | {
      openId: string;
      close: () => void;
      open: (id: string) => void;
    }
  | undefined;

const MenuContext = createContext<MenuContextType>(undefined);

// Encapsulate button logic in menu using compound component
export default function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  // useOutsideClick(close);

  return (
    <MenuContext.Provider value={{ openId, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children, id }: { children: ReactNode; id: string }) {
  const context = useContext(MenuContext);

  if (!context) {
    return null;
  }

  const { openId } = context;

  return openId === id ? (
    <Box className="absolute top-[20px] left-[-40px] z-20 bg-[var(--color-grey-0)] shadow-md rounded-[var(--border-radius-md)]">
      {children}
    </Box>
  ) : null;
}

function Toggle({ children, id }: { children: ReactElement; id: string }) {
  const context = useContext(MenuContext);

  if (!context) {
    return null;
  }

  const { openId, open, close } = context;

  // Clone the children and add an onClick handler to toggle the menu state
  return (
    <Box className="justify-self-end cursor-pointer">
      {cloneElement(children, {
        onClick: () => {
          if (openId === id) return close();
          open(id);
        },
      })}
    </Box>
  );
}

function Button({
  icon,
  children,
  onClick,
}: {
  icon: ReactElement;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-none border-none py-[1.5rem] px-[2.4rem] text-[1.4rem] transition-all duration-200 flex items-center gap-[1.6rem] hover:bg-gray-50"
    >
      {icon}
      {children}
    </button>
  );
}
Menus.Menu = Menu;
Menus.Toogle = Toggle;
Menus.Button = Button;
