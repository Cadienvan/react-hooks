import { useState, useEffect } from "react";
import HelloWorld from "./components/HelloWorld";

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>Visible: {show}</div>
      <button onClick={() => setShow(!show)}>Show/Hide</button>
      {show && <HelloWorld />}
    </>
  );
}

export default App;
