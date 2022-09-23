import { useEffect } from "react";

export default function onMount(fn) {
  useEffect(fn, []);
}
