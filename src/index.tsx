import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const articleOptionsRef = useRef({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});
	const [state, setState] = useState(articleOptionsRef.current);

	function handleChangeArticleParams({
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	}: ArticleStateType) {
		articleOptionsRef.current = {
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		};
		setState(articleOptionsRef.current);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			{/* здесь обрабатываем выбор в форме, а после клика на кнопки Сбросить или Принять
				устанавливаем в объекте значения дефолтных или новых параметров
				получается, что дочерний компонент меняет объект, который принимает в качестве пропса
			*/}
			<ArticleParamsForm
				articleProps={articleOptionsRef.current}
				onChangeParams={handleChangeArticleParams}
			/>

			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
