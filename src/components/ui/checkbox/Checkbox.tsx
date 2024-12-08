import { FC } from 'react';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import { useViewFilters } from '../../../store/store';
import { ICheckbox } from '../../../types/props.types';
import { truncateDescription } from '../../../utils/egitText';

import styles from './Checkbox.module.scss';

const Checkbox: FC<ICheckbox> = ({ checkbox, onChange, isCheck }) => {
	const idString = String(checkbox.id);
	const { windowSize } = useCheckWidth();
	const { isCalendar, isEstimate, isRegion } = useViewFilters(store => store);
	const isMobile = windowSize.width <= 451;
	const isTablet = windowSize.width <= 768.98;
	const count = isTablet ? 20 : 38;

	return (
		<div className={styles.wrapper_checkbox}>
			<input
				type='checkbox'
				id={idString}
				className={styles.input__checkbox}
				checked={isCheck}
				onChange={onChange}
			/>
			<div className={styles.block__checkbox}>
				{isCheck && <img src='/images/icons/checkbox.svg' alt='checkbox' />}
			</div>
			<label
				htmlFor={idString}
				className={styles.label}
				style={isCalendar ? { fontSize: '0.875rem' } : {}}
			>
				{isMobile
					? isCalendar || isRegion
						? checkbox.name
						: isEstimate
							? truncateDescription(checkbox.name, 35)
							: truncateDescription(checkbox.name, count)
					: truncateDescription(checkbox.name, count)}
			</label>
		</div>
	);
};

export default Checkbox;
