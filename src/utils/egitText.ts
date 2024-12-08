export const truncateDescription = (
	description: string,
	maxLength: number,
): string => {
	if (description.length <= maxLength) {
		return description;
	}

	return description.slice(0, maxLength) + '...';
};

export const truncateDescriptionArrStrings = (
	arr: string[],
	maxLength: number,
) => {
	return arr.map(st => {
		if (st.length <= maxLength) {
			return st;
		}

		return st.slice(0, maxLength);
	});
};
