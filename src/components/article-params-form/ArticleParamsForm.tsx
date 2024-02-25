import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { OutsideClickFormCloser } from '../OutsideClickFormCloser/OutsideClickFormCloser';

type TArticleProps = {
	articleProps: ArticleStateType;
	onChangeParams: (changeArticleOptions: ArticleStateType) => void;
};

// props: fontSelected fontSizeSelected fontColorSelected bgColorSelected contentWidthSelected
export const ArticleParamsForm = ({
	articleProps,
	onChangeParams,
}: TArticleProps) => {
	const {
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	} = articleProps;

	const [isContainerOpen, setIsContainerOpen] = useState(false);

	const [fontSelected, setFontSelected] = useState(fontFamilyOption);
	const [fontColorSelected, setFontColorSelected] = useState(fontColor);
	const [bgColorSelected, setBgColorSelected] = useState(backgroundColor);
	const [contentWidthSelected, setContentWidthSelected] =
		useState(contentWidth);
	const [fontSizeSelected, setFontSizeSelected] = useState(fontSizeOption);

	function handleClickArrowButton() {
		setIsContainerOpen((prev) => !prev);
	}

	return (
		<OutsideClickFormCloser state={isContainerOpen} setState={setIsContainerOpen}>
			<ArrowButton
				isContainerOpen={isContainerOpen}
				onClick={handleClickArrowButton}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isContainerOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(evt: React.SyntheticEvent) => {
						evt.preventDefault();
						onChangeParams({
							fontFamilyOption: fontSelected,
							fontColor: fontColorSelected,
							backgroundColor: bgColorSelected,
							contentWidth: contentWidthSelected,
							fontSizeOption: fontSizeSelected,
						});
						setIsContainerOpen(false);
					}}
					>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={fontSelected}
						title='шрифт'
						onChange={setFontSelected}
					/>
					<RadioGroup
						selected={fontSizeSelected}
						name='radio'
						onChange={setFontSizeSelected}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColorSelected}
						title='Цвет шрифта'
						onChange={setFontColorSelected}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={bgColorSelected}
						title='Цвет фона'
						onChange={setBgColorSelected}
					/>

					<Select
						options={contentWidthArr}
						selected={contentWidthSelected}
						title='Ширина контента'
						onChange={setContentWidthSelected}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='button'
							onClick={(evt: React.SyntheticEvent) => {
								evt.preventDefault();
								// сбрасываем опции в форме
								setFontSelected(defaultArticleState.fontFamilyOption);
								setFontColorSelected(defaultArticleState.fontColor);
								setBgColorSelected(defaultArticleState.backgroundColor);
								setContentWidthSelected(defaultArticleState.contentWidth);
								setFontSizeSelected(defaultArticleState.fontSizeOption);

								// сбрасываем опции в стейте
								onChangeParams({
									fontFamilyOption: defaultArticleState.fontFamilyOption,
									fontColor: defaultArticleState.fontColor,
									backgroundColor: defaultArticleState.backgroundColor,
									contentWidth: defaultArticleState.contentWidth,
									fontSizeOption: defaultArticleState.fontSizeOption,
								});

								// закрываем форму
								setIsContainerOpen(false);
							}}
						/>
						<Button
							title='Применить'
							type='submit'
						/>
					</div>
				</form>
			</aside>
		</OutsideClickFormCloser>
	);
};
