import HeroSection from '@/components/home/HeroSection';
import HomeTopBar from '@/components/home/HomeTopBar';
import SearchBar from '@/components/home/SearchBar';
import GlobalRecipesSection from '@/components/home/GlobalRecipesSection';
import TrendingRecipesSection from '@/components/home/TrendingRecipesSection';
import TopChoicesSection from '@/components/home/TopChoicesSection';
import { createClient } from '@/service/api/supabaseServer';

interface Recipe {
	id: number;
	title: string;
}

export default async function HomePage() {
	const supabase = await createClient();

	const { data: recipes } = await supabase.from('recipes').select('*');

	return (
		<div className='p-4 md:p-6'>
			<HomeTopBar />

			<div className='mb-6'>
				<HeroSection />
			</div>

			<SearchBar />

			<div className='grid gap-6 md:grid-cols-[2fr_1fr]'>
				<GlobalRecipesSection />
				<TrendingRecipesSection />
			</div>

			<TopChoicesSection />

			{/* TEMP DEBUG LIST */}
			<section className='mt-8 rounded-xl bg-[#1b232b] p-4'>
				<h2 className='mb-4 text-sm italic text-[#f5f1e8]'>Recipes from Supabase</h2>

				<ul className='space-y-2'>
					{recipes?.map((recipe: Recipe) => (
						<li
							key={recipe.id}
							className='text-sm text-[#f5f1e8]'>
							{recipe.title}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
