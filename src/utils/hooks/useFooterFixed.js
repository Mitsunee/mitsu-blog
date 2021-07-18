import { useState } from "react";
import { useStore } from "nanostores/react";

import { useClientOnlyEffect } from "@utils/hooks/clientOnly";
import { clientStore } from "@stores/client";

export const useFooterFixed = () => {
  const [footerFixed, setFooterFixed] = useState(false);
  const { height } = useStore(clientStore);

  useClientOnlyEffect(() => {
    const [el] = document.getElementById("__next").getClientRects();
    setFooterFixed(el.height < height);
  });

  return footerFixed;
};
