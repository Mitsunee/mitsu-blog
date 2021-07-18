import { useState, useEffect, useLayoutEffect } from "react";

export const useClientOnlyEffect =
  typeof window !== "undefined"
    ? useLayoutEffect // layout effects are not rendered in serverside rendering
    : useEffect;

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useClientOnlyEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function NoSSR({ children }) {
  const isClient = useIsClient();

  return <>{isClient ? children : null}</>;
}
