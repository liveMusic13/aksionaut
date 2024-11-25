import { FC } from 'react';

import { selectsArr } from '../../data/selects.data';
import { useSettingsStore } from '../../store/store';

import styles from './SettingsBlock.module.scss';

const SettingsBlock: FC = () => {
	const setIsSettings = useSettingsStore(store => store.setIsSettings);

	const onClick = () => {
		setIsSettings(false);
	};

	return (
		<div className={styles.block__settings}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Параметры</h2>
				<button className={styles.exit} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.block__selects}>
				{selectsArr.map(sel => (
					<div key={sel.id}>
						<div className={styles.block__titleSelect}>
							<h3 className={styles.title__select}>{sel.name}</h3>
							<p className={styles.value__select}></p>
						</div>
						<img
							src='/images/icons/arrow_bot.svg'
							alt='arrow'
							className={styles.arrow}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default SettingsBlock;
