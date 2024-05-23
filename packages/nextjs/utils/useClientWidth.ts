import { useEffect, useState } from "react";

const useClientWidth = (): number | null => {
  const [clientWidth, setClientWidth] = useState<number | null>(null);

  useEffect(() => {
    // Check if window object exists (client-side)
    if (typeof window !== "undefined") {
      const handleResize = () => setClientWidth(window.innerWidth);
      // Set initial width on mount
      handleResize();
      // Add resize event listener
      window.addEventListener("resize", handleResize);

      // Cleanup function to remove event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return clientWidth;
};

export default useClientWidth;
