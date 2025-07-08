import { useRef, useState, useEffect } from "react";

const useTimedMessage = (timeInMsec = 3000) => {
  const [active, setActive] = useState(false);
  const messageShownRef = useRef(false);

  useEffect(() => {
    if (active && !messageShownRef.current) {
      messageShownRef.current = true;
      const timer = setTimeout(() => {
        setActive(false);
        messageShownRef.current = false;
      }, timeInMsec);

      // Cleanup function
      return () => clearTimeout(timer);
    }
  }, [active, timeInMsec]);

  return [active, setActive];
};

export default useTimedMessage;
