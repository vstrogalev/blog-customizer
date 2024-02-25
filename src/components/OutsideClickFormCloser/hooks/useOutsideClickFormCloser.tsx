import { RefObject, useEffect } from "react";

export function useOutsideClickFormCloser( ref: RefObject<HTMLElement>, state: boolean, setState: (state: boolean)=>void ) {
	useEffect(() => {
		// обработка клика
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
				setState(false);
			}
		}
		// устанавливаем слушатель с учетом открытия формы
		if (state) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [state]);
}