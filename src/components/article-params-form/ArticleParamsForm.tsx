import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';

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
		<>
			<ArrowButton
				isContainerOpen={isContainerOpen}
				handleClickArrowButton={handleClickArrowButton}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isContainerOpen,
				})}>
				<form className={styles.form}>
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
						<Button title='Сбросить' type='reset' />
						<Button
							title='Применить'
							type='submit'
							onClick={()=>{
									onChangeParams({
										fontFamilyOption: fontSelected,
										fontColor: fontColorSelected,
										backgroundColor: bgColorSelected,
										contentWidth: contentWidthSelected,
										fontSizeOption: fontSizeSelected
									});
								}
							}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
