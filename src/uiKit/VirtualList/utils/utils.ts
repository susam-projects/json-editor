/**
 * A possible optimization would be to use itemPositions instead of itemHeights,
 * but looks like it's performant enough as it is. Especially, since we don't
 * trigger the calculation too often thanks to scrollThreshold.
 */
export const findVisibleStart = (itemHeights: number[], scrollTop: number) => {
  let accumulatedHeight = 0;
  let visibleStart = 0;

  for (let i = 0; i < itemHeights.length; i++) {
    if (accumulatedHeight + itemHeights[i] > scrollTop) {
      break;
    }
    visibleStart = i;
    accumulatedHeight += itemHeights[i];
  }

  return visibleStart;
};

export const findVisibleEnd = (
  itemHeights: number[],
  visibleStart: number,
  viewportHeight: number,
) => {
  let visibleEnd = 0;
  let visibleHeight = 0;

  for (let i = visibleStart; i < itemHeights.length; i++) {
    if (visibleHeight > viewportHeight) {
      break;
    }
    visibleHeight += itemHeights[i];
    visibleEnd = i;
  }

  return visibleEnd;
};

export const getViewportHeight = (
  listTop: number,
  listHeight: number,
  scrollTop: number,
) => {
  const windowHeight = window.innerHeight;

  const isScrolledAboveList = listTop > 0;
  const isScrolledBelowList =
    !!listHeight && scrollTop + windowHeight > listHeight;

  if (isScrolledAboveList) {
    return windowHeight + scrollTop;
  }
  if (isScrolledBelowList) {
    return Math.max(listHeight + listTop, 0);
  }
  return windowHeight;
};

export const getOptimalBufferSize = (
  estimatedItemHeight: number,
  dataLength: number,
  minBufferSize: number,
  maxBufferSize: number,
) => {
  const itemsOnTheScreen = Math.round(window.innerHeight / estimatedItemHeight);
  const bufferSizeOptimalForFastScrolling = Math.round(
    0.01 * itemsOnTheScreen * dataLength,
  );
  return Math.max(
    Math.min(bufferSizeOptimalForFastScrolling, maxBufferSize),
    minBufferSize,
  );
};

export const getOptimalScrollThreshold = (
  estimatedItemHeight: number,
  bufferSize: number,
) => {
  return (estimatedItemHeight * bufferSize) / 2;
};
