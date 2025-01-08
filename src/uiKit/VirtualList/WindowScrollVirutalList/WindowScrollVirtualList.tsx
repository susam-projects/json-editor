import React from "react";
import sum from "lodash/sum";
import get from "lodash/get";
import { ItemWrapper } from "../ItemWrapper/ItemWrapper.tsx";
import {
  findVisibleEnd,
  findVisibleStart,
  getViewportHeight,
} from "../utils/utils.ts";
import { useStyles } from "./WindowScrollVirtualList.styles.ts";
import { SetState } from "../../../utils/utilityTypes.ts";

type VirtualTableProps<T> = {
  data: T[];
  ListItem: React.ComponentType<ListItemProps<T>>;
  getItemKey?: (item: T, itemIndex: number) => string | number;
  estimatedItemHeight?: number;
  bufferSize?: number;
  scrollThreshold?: number;
};

export type ListItemProps<T> = {
  itemIndex: number;
  item: T;
};

type KeysRecord = Record<string, number>;

function ensureDefaultProps<T>(
  props: VirtualTableProps<T>,
): Required<VirtualTableProps<T>> {
  return {
    ...props,
    getItemKey: get(props, "getItemKey", (_, itemIndex) => itemIndex),
    estimatedItemHeight: get(props, "estimatedItemHeight", 100),
    bufferSize: get(props, "bufferSize", 5),
    scrollThreshold: get(props, "scrollThreshold", 100),
  };
}

/**
 * Have to track height of each item since the real height can differ and even change
 */
function useItemHeights<T>({
  data,
  getItemKey,
  estimatedItemHeight,
}: Required<VirtualTableProps<T>>) {
  const prevKeysRef = React.useRef<KeysRecord>({});
  const [itemHeights, setItemHeights] = React.useState<number[]>([]);

  const updateItemHeights_ = () => {
    // Initialize and update item heights when data changes
    // The idea of this method is to track keys of items and preserve previously calculated heights

    const getCurrentKeys = () => {
      const currentKeys: KeysRecord = {};
      data.forEach((item, index) => {
        const key = String(getItemKey(item, index));
        currentKeys[key] = index;
      });
      return currentKeys;
    };

    const getNewHeights = (prevHeights: number[], currentKeys: KeysRecord) => {
      let isChanged = false;
      const newHeights = Array(data.length);

      for (const key in currentKeys) {
        const currentIndex = currentKeys[key];
        const previousIndex = prevKeysRef.current[key];

        if (
          previousIndex !== undefined &&
          prevHeights[previousIndex] !== undefined
        ) {
          newHeights[currentIndex] = prevHeights[previousIndex];
          if (currentIndex !== previousIndex) {
            isChanged = true; // the item was moved
          }
        } else {
          newHeights[currentIndex] = estimatedItemHeight;
          isChanged = true; // it's a new item
        }
      }
      isChanged ||= newHeights.length !== prevHeights.length; // if the last item was deleted

      return { isChanged, newHeights };
    };

    setItemHeights((prevHeights) => {
      const currentKeys = getCurrentKeys();
      const { isChanged, newHeights } = getNewHeights(prevHeights, currentKeys);
      prevKeysRef.current = currentKeys;
      return isChanged ? newHeights : prevHeights;
    });
  };
  const updateItemHeights = React.useCallback(updateItemHeights_, [
    data,
    estimatedItemHeight,
    getItemKey,
  ]);

  React.useEffect(() => {
    updateItemHeights();
  }, [updateItemHeights]);

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
  const handleItemResize = React.useCallback(handleItemResize_, [
    setItemHeights,
  ]);

  return {
    itemHeights,
    handleItemResize,
  };
}

function useViewport<T>(
  { data, bufferSize, scrollThreshold }: Required<VirtualTableProps<T>>,
  listHeight: number,
  itemHeights: number[],
) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const lastScrollPosition = React.useRef(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(0);

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

  // useLayoutEffect - since updateVisibleItems reads from the DOM
  React.useLayoutEffect(() => {
    updateVisibleItems();
  }, [data, updateVisibleItems]);

  // useLayoutEffect - since updateVisibleItems reads from the DOM
  React.useLayoutEffect(() => {
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

  return {
    startIndex,
    endIndex,
    listRef,
  };
}

function useListDimensions(
  setListHeight: SetState<number>,
  itemHeights: number[],
  startIndex: number,
) {
  const [renderedItemsOffset, setRenderedItemsOffset] = React.useState(0);

  // useLayoutEffect prevents flickering in some cases
  React.useLayoutEffect(() => {
    setListHeight(sum(itemHeights));
  }, [itemHeights, setListHeight]);

  // useLayoutEffect prevents flickering in some cases
  React.useLayoutEffect(() => {
    const itemsOffset = sum(itemHeights.slice(0, startIndex));
    setRenderedItemsOffset(itemsOffset);
  }, [itemHeights, startIndex]);

  return {
    renderedItemsOffset,
  };
}

export function WindowScrollVirtualList<T>(props: VirtualTableProps<T>) {
  const processedProps = ensureDefaultProps(props);
  const { data, ListItem, getItemKey } = processedProps;

  const { styles } = useStyles();

  const [listHeight, setListHeight] = React.useState(0);

  const { itemHeights, handleItemResize } = useItemHeights(processedProps);

  const { listRef, startIndex, endIndex } = useViewport(
    processedProps,
    listHeight,
    itemHeights,
  );

  const { renderedItemsOffset } = useListDimensions(
    setListHeight,
    itemHeights,
    startIndex,
  );

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
                key={getItemKey(item, itemIndex)}
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
