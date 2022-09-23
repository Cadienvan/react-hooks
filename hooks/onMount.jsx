import { useEffect } from "react";

export function onMount(fn) {
  useEffect(fn, []);
}
