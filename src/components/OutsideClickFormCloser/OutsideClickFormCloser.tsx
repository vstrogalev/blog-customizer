import { ReactNode, useRef } from "react";
import { useOutsideClickFormCloser } from "./hooks/useOutsideClickFormCloser";

type TOutsideClickFormProps = {
	state: boolean;
	setState: (state: boolean)=>void;
	children: ReactNode;
};

export function OutsideClickFormCloser({ state, setState, children }: TOutsideClickFormProps) {
	const wrapperRef = useRef(null);
	useOutsideClickFormCloser(wrapperRef, state, setState);
	return <div ref={wrapperRef}>{children}</div>;
}