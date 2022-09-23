import { useEffect } from "react";

export default function onUnmount(fn) {
  useEffect(() => {
    return () => fn;
  }, []);
}
