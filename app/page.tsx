import HeroSection from '@/components/home/HeroSection';
import HomeTopBar from '@/components/home/HomeTopBar';
import SearchBar from '@/components/home/SearchBar';
import GlobalRecipesSection from '@/components/home/GlobalRecipesSection';
import TrendingRecipesSection from '@/components/home/TrendingRecipesSection';
import TopChoicesSection from '@/components/home/TopChoicesSection';

export default function HomePage() {
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
		</div>
	);
}
