import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const Portal: React.FC = ({ children }) => {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const elem = document.createElement("div");
    setPortal(elem);

    document.body.appendChild(elem);
    return () => {
      document.body.removeChild(elem);
    };
  }, []);

  return portal && ReactDOM.createPortal(children, portal);
};
