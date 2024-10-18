"use client";

import { useEffect } from "react";

function useOutsideClick(onClick: () => void) {
  useEffect(() => {
    // Add the event listener
    document.body.addEventListener("click", onClick, false);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, [onClick]);
}

export default useOutsideClick;
