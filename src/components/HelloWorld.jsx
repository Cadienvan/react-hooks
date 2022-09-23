import React from "react";
import { useEffect } from "react";
import onUnmount from "../hooks/onUnmount";
import onMount from "../hooks/onUnmount";

function HelloWorld(props) {
  onMount(() => {
    console.log("Hello World!");
  });
  onUnmount(() => {
    console.log("Goodbye World!");
  });
  return <div>Here I Am</div>;
}

export default HelloWorld;
