import { useEffect } from "react";

export function onUnmount(fn) {
  useEffect(() => {
    return () => fn;
  }, []);
}
