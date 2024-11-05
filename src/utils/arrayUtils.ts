export const addAfter = <T>(arr: T[], prevItemIndex: number, newItem: T): T[] => {
	if (prevItemIndex < 0) {
		return [newItem, ...arr];
	}

	return arr.reduce<T[]>((result, item, currentItemIndex) => {
		result.push(item);
		if (currentItemIndex === prevItemIndex) {
			result.push(newItem);
		}
		return result;
	}, []);
};
