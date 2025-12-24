import { useEffect, useRef, useState } from "react";
//This is great for long pages like product listing.
export function useLazyLoad() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
