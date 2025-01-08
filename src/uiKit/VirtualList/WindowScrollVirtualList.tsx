import React from "react";
import sum from "lodash/sum";
import { ItemWrapper } from "./ItemWrapper.tsx";
import {
  findVisibleEnd,
  findVisibleStart,
  getViewportHeight,
} from "./utils.ts";
import { useStyles } from "./VirtualList.styles.ts";
import {
  useConnectVirtualListController,
  VirtualListController,
} from "./useVirtualListController.ts";

type VirtualTableProps<T> = {
  data: T[];
  ListItem: React.ComponentType<ListItemProps<T>>;
  getItemKey?: (itemIndex: number) => React.Key;
  estimatedItemHeight?: number;
  bufferSize?: number;
  scrollThreshold?: number;
  controller?: VirtualListController;
};

export type ListItemProps<T> = {
  itemIndex: number;
  item: T;
};

export function WindowScrollVirtualList<T>({
  data,
  ListItem,
  getItemKey = (itemIndex) => itemIndex,
  estimatedItemHeight = 100,
  bufferSize = 5,
  scrollThreshold = 100,
  controller,
}: VirtualTableProps<T>) {
  const { styles } = useStyles();

  const listRef = React.useRef<HTMLDivElement>(null);
  const lastScrollPosition = React.useRef(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(0);
  const [itemHeights, setItemHeights] = React.useState<number[]>([]);
  const [listHeight, setListHeight] = React.useState(0);
  const [renderedItemsOffset, setRenderedItemsOffset] = React.useState(0);

  useConnectVirtualListController(
    controller,
    setItemHeights,
    estimatedItemHeight,
  );

  React.useEffect(() => {
    // Initialize item heights with an estimated value
    setItemHeights(Array(data.length).fill(estimatedItemHeight));
    setListHeight(data.length * estimatedItemHeight);
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateVisibleItems_ = () => {
    if (!listRef.current) return;

    const listTop = listRef.current.getBoundingClientRect().top;
    const scrollTop = Math.min(-listTop, listHeight);

    const viewportHeight = getViewportHeight(listTop, listHeight, scrollTop);

    const visibleStart = findVisibleStart(itemHeights, scrollTop);
    const visibleEnd = findVisibleEnd(
      itemHeights,
      visibleStart,
      viewportHeight,
    );

    setStartIndex(Math.max(0, visibleStart - bufferSize));
    setEndIndex(Math.min(data.length - 1, visibleEnd + bufferSize));
  };
  const updateVisibleItems = React.useCallback(updateVisibleItems_, [
    bufferSize,
    data,
    itemHeights,
    listHeight,
  ]);

  React.useEffect(() => {
    updateVisibleItems();
  }, [data, updateVisibleItems]);

  React.useEffect(() => {
    updateVisibleItems();

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const scrollDifference = Math.abs(
        currentScrollPosition - lastScrollPosition.current,
      );

      if (scrollDifference > scrollThreshold) {
        lastScrollPosition.current = currentScrollPosition;
        updateVisibleItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, updateVisibleItems]);

  React.useEffect(() => {
    setListHeight(sum(itemHeights));
  }, [itemHeights]);

  React.useEffect(() => {
    const itemsOffset = sum(itemHeights.slice(0, startIndex));
    setRenderedItemsOffset(itemsOffset);
  }, [itemHeights, startIndex]);

  const handleItemResize_ = (index: number, height: number) => {
    setItemHeights((prev) => {
      if (prev[index] !== height) {
        const newHeights = [...prev];
        newHeights[index] = height;
        return newHeights;
      }
      return prev;
    });
  };
  const handleItemResize = React.useCallback(handleItemResize_, []);

  return (
    <div
      ref={listRef}
      className={styles.list}
      style={{ height: `${listHeight}px` }}
    >
      <ul
        style={{
          willChange: "transform",
          transform: `translateY(${renderedItemsOffset}px)`,
        }}
      >
        {data
          .slice(startIndex, Math.min(data.length, endIndex + 1))
          .map((item, index) => {
            const itemIndex = startIndex + index;
            return (
              <ItemWrapper
                key={getItemKey(itemIndex)}
                index={itemIndex}
                onResize={handleItemResize}
              >
                <ListItem itemIndex={itemIndex} item={item} />
              </ItemWrapper>
            );
          })}
      </ul>
    </div>
  );
}
