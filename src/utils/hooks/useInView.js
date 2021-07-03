import { useState, useRef, useEffect } from "react";

// safeguarded observer that doesn't break serverside rendering
function makeObserver(fn) {
  try {
    return new IntersectionObserver(fn);
  } catch {
    return null;
  }
}

export const useInView = (ref, defaultState) => {
  const [isIntersecting, setIntersecting] = useState(defaultState);

  // make observer as reference to avoid making a new one every re-render
  const observerRef = useRef(
    makeObserver(([entry]) => setIntersecting(entry.isIntersecting))
  );

  useEffect(() => {
    const { current: observer } = observerRef;
    if (observer.current === null) return;
    if (ref.current !== null)
      // the ref is null during the initial draw of the page
      observer.observe(ref.current);

    // Remove the observer as soon as the component is unmounted
    return () => observer.disconnect();
  }, [ref, observerRef]);

  return isIntersecting; // return state
};
