import { useEffect, useState } from "react";

export function useScrollActive(threshold = 50) {
  const [active, setActive] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return active;
}
