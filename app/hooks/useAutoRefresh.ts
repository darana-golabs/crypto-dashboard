import { useEffect, useRef } from "react";
import { useRevalidator } from "@remix-run/react";

export function useAutoRefresh(refreshInterval: number) {
  const { revalidate } = useRevalidator();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        console.log("refreshing");
        revalidate();
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refreshInterval, revalidate]);
} 