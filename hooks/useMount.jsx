import { useEffect } from "react";

export function useMount(fn) {
  return useEffect(fn, []);
}
