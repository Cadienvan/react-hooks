import { useState, useCallback } from "react";

export default function useAtom(
  initialValue,
  options = { triggerSubscribeOnFirstRender: false }
) {
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
  var observers = [];
  const atom = new Proxy(
    {
      value: initialValue,
      subscribe(cb) {
        observers.push(cb);
        if (options.triggerSubscribeOnFirstRender) cb(internalValue, previosValue);
      },
      unsubscribe(cb) {
        observers = observers.filter((observer) => observer !== cb);
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
          if (observers.length > 0) {
            observers.forEach((cb) => cb(value, previosValue));
          }
          return true;
        }
        return Reflect.set(target, prop, value, receiver);
      },
    }
  );
  return useCallback(() => atom, [initialValue])();
}
