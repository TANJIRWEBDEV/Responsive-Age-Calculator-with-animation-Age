import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ from, to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = value.toFixed();
      },

      ease: "easeIn",
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}
