export type BreadcrumbType = {
	title: string;
	link?: string;
};

type Props = {
	breadcrumbs?: BreadcrumbType[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
	if (!breadcrumbs?.length) {
		return null;
	}

	return (
		<div className="breadcrumbs text-sm">
			<ul>
				{breadcrumbs.map(({ title, link }) => (
					<li key={title}>{link ? <a href="/account">{title}</a> : title}</li>
				))}
			</ul>
		</div>
	);
};
