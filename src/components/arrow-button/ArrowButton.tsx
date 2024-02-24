import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isContainerOpen: boolean;
	handleClickArrowButton: () => void;
};

export const ArrowButton = ({
	isContainerOpen,
	handleClickArrowButton,
}: TArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={handleClickArrowButton}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isContainerOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isContainerOpen })}
			/>
		</div>
	);
};
