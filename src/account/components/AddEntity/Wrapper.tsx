"use client";

import type { FormEvent, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Wrapper = ({ children }: Props) => {
	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		console.log(event.target);
		event.preventDefault();
	};

	return (
		<form onSubmit={onSubmit}>
			<label className="floating-label mb-3">
				<span>name</span>
				<input
					className="input input-sm"
					type="text"
					name="xxy"
					placeholder="xxy"
					defaultValue="cow"
				/>
			</label>
			<button className="btn btn-sm" type="submit">
				submit
			</button>
		</form>
	);
};
