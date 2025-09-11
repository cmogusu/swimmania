import { Page } from "@/components/Page";
import { CardList } from "@/components/CardList";

export default async function Category() {
	return (
		<Page>
			<h1>Categories</h1>
			<section className="mb-2">
				<h2>Most popular</h2>
				<div>
					<CardList categoryId="popular" />
				</div>
			</section>

			<section className="mb-2">
				<h2>Interesting</h2>
				<div>
					<CardList categoryId="interesting" />
				</div>
			</section>
		</Page>
	);
}
