"use client";

import { useActionState } from "react";
import { createPost } from "./utils";

const initialState = {
	message: "",
};

const formFields = [
	{
		name: "name",
		title: "Name",
		placeholder: "John",
		type: "text",
		required: true,
	},
	{
		name: "company",
		title: "Company",
		placeholder: "Xyz.inc",
		type: "text",
		required: false,
	},
	{
		name: "email",
		title: "Email address",
		placeholder: "example@mysite.com",
		type: "text",
		required: true,
	},
	{
		name: "content",
		title: "Content",
		placeholder: "Lets get in touch...",
		type: "textarea",
	},
];

export const Form = () => {
	const [state, formAction, pending] = useActionState(createPost, initialState);

	return (
		<form action={formAction}>
			{formFields.map((field) => (
				<div key={field.name}>
					<label htmlFor={field.name}>{field.title}</label>
					{field.type === "textarea" ? (
						<textarea name={field.name} required={field.required} />
					) : (
						<input
							type={field.type}
							name={field.name}
							required={field.required}
						/>
					)}
				</div>
			))}

			{state?.message && <p aria-live="polite">{state.message}</p>}
			<button disabled={pending} type="button">
				Create Post
			</button>
		</form>
	);
};
