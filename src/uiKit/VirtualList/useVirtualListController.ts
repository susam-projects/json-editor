import React from "react";
import { SetState } from "../../utils/utilityTypes.ts";

export type VirtualListHandle = {
  addItemBefore: (nextItemIndex: number) => void;
  addItemAfter: (prevItemIndex: number) => void;
  removeItem: (itemIndex: number) => void;
};

export type VirtualListController = React.Ref<VirtualListHandle>;

export const useVirtualListController = () => {
  return React.useRef<VirtualListHandle>(null);
};

export const useConnectVirtualListController = (
  controller: React.Ref<VirtualListHandle> | undefined,
  setItemHeights: SetState<number[]>,
  estimatedItemHeight: number,
) => {
  React.useImperativeHandle(controller, () => {
    return {
      addItemBefore: (nextItemIndex) => {
        setItemHeights((prev) => {
          return [
            ...prev.slice(0, nextItemIndex),
            estimatedItemHeight,
            ...prev.slice(nextItemIndex),
          ];
        });
      },

      addItemAfter: (prevItemIndex) => {
        setItemHeights((prev) => {
          return [
            ...prev.slice(0, prevItemIndex + 1),
            estimatedItemHeight,
            ...prev.slice(prevItemIndex + 1),
          ];
        });
      },

      removeItem: (itemIndex) => {
        setItemHeights((prev) => {
          return prev.filter((_, index) => index !== itemIndex);
        });
      },
    };
  });
};
