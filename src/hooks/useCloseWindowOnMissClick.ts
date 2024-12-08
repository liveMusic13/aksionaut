import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export const useCloseWindowOnMissClick = (
	ref: RefObject<HTMLDivElement>,
	setState: Dispatch<SetStateAction<boolean>>,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setState(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
};
