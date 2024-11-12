import { FC } from 'react';

import { ICheckbox } from '../../../types/props.types';

import styles from './Checkbox.module.scss';

const Checkbox: FC<ICheckbox> = ({ checkbox, onChange, isCheck }) => {
	const idString = String(checkbox.id);

	// const [isCheck, setIsCheck] = useState<boolean>(false);

	return (
		<div className={styles.wrapper_checkbox}>
			<input
				type='checkbox'
				id={idString}
				className={styles.input__checkbox}
				checked={isCheck}
				// onChange={() => onChange(setIsCheck, isCheck)}
				onChange={onChange}
			/>
			<div className={styles.block__checkbox}>
				{isCheck && <img src='/images/icons/checkbox.svg' alt='checkbox' />}
			</div>
			<label htmlFor={idString} className={styles.label}>
				{checkbox.name}
			</label>
		</div>
	);
};

export default Checkbox;
