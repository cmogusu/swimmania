"use client";

import { useEffect } from "react";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export const Play = () => {
	useEffect(() => {
		const validate = new BaseValidate();
		console.log(validate);
	}, []);
	return <div>hello world</div>;
};
