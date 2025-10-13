type Props = {
	handleClick: () => void;
};

export const Play = ({ handleClick }: Props) => {
	return (
		<section>
			<h1>header</h1>
			<div>
				<p>this is a lot of fancy text</p>
				<button test-id="viewMore" type="button" onClick={handleClick}>
					View more
				</button>
			</div>
		</section>
	);
};
