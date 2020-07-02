import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<Element>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        callback(event);
      }
    };
    document.addEventListener("mousedown", { handleEvent: handleClickOutside });

    return () =>
      document.removeEventListener("mousedown", {
        handleEvent: handleClickOutside,
      });
  }, [ref, callback]);
};
