import { useState, useCallback } from "react";

export default function useAtom(initialValue) {
  // check if the value is a primitive
  if (typeof initialValue === "function") {
    throw new Error("useAtom only accepts primitives and objects");
  }
  if (typeof initialValue === "object") {
    for (let key in initialValue) {
      initialValue[key] = useAtom(initialValue[key]);
    }
    return initialValue;
  }
  const [state, setState] = useState(initialValue);
  var internalValue = state;
  var previosValue = state;
  var watchCb = null;
  const atom = new Proxy(
    {
      value: initialValue,
      watch(cb) {
        watchCb = cb;
      },
    },
    {
      get(target, prop, receiver) {
        if (prop == "value") {
          return internalValue;
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (prop == "value" && internalValue !== value) {
          previosValue = internalValue;
          internalValue = value;
          setState(value);
          if (watchCb) {
            watchCb(value, previosValue);
          }
          return true;
        }
        return Reflect.set(target, prop, value, receiver);
      },
    }
  );
  return useCallback(() => atom, [initialValue])();
}
