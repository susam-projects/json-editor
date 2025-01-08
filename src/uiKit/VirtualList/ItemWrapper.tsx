import { WithChildren } from "../../utils/utilityTypes.ts";
import React from "react";

type ItemWrapperProps = {
  index: number;
  onResize: (index: number, height: number) => void;
} & WithChildren;

const ItemWrapper_: React.FC<ItemWrapperProps> = ({
  index,
  onResize,
  children,
}) => {
  const ref = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      const height = ref.current.offsetHeight;
      onResize(index, height);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [index, onResize]);

  return <li ref={ref}>{children}</li>;
};
export const ItemWrapper = React.memo(ItemWrapper_);
