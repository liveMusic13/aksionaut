import { FC, useEffect, useRef, useState } from 'react';

import { IPanelTarget } from '../../../types/props.types';

import styles from './PanelTarget.module.scss';

const PanelTarget: FC<IPanelTarget> = ({
	dataButtons,
	activeButton,
	handleClick,
}) => {
	const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		// Найти активную кнопку и обновить положение и ширину линии
		const activeIndex = dataButtons.findIndex(but => but.name === activeButton);

		if (activeIndex !== -1 && buttonRefs.current[activeIndex]) {
			const button = buttonRefs.current[activeIndex];
			const buttonRect = button.getBoundingClientRect();
			setLineStyle({
				width: buttonRect.width,
				left: button.offsetLeft,
			});
		}
	}, [activeButton, dataButtons]);

	return (
		<div className={styles.block__buttons}>
			{dataButtons.map((but, index) => (
				<button
					key={but.id}
					ref={el => (buttonRefs.current[index] = el)} // Сохраняем реф для каждой кнопки
					className={
						activeButton === but.name ? styles.activeButton : styles.button
					}
					onClick={() => handleClick(but.name)}
				>
					{but.name}
				</button>
			))}
			<div
				className={styles.target__line}
				style={{
					width: `${lineStyle.width}px`,
					left: `${lineStyle.left}px`,
				}}
			></div>
		</div>
	);
};

export default PanelTarget;
