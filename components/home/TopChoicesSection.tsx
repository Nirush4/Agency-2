// import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Pagination from '@/components/home/Pagination';

const recipes = Array.from({ length: 10 }, (_, i) => ({
	id: i,
	title: 'Food Title',
}));

export default function TopChoicesSection() {
	return (
		<section className='mt-6 rounded-xl bg-[#1b232b] p-4'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className='text-sm italic text-[#f5f1e8]'>Top Choices for You</h2>

				{/* <div className='hidden gap-2 text-xs sm:flex'>
					<button
						type='button'
						className='flex items-center gap-2 rounded bg-[#697542] px-2 py-1 text-[#f5f1e8] transition hover:bg-[#7a8550]'>
						<SlidersHorizontal size={12} />
						<span>Filter</span>
					</button>

					<button
						type='button'
						className='flex items-center gap-2 rounded bg-[#697542] px-2 py-1 text-[#f5f1e8] transition hover:bg-[#7a8550]'>
						<ArrowUpDown size={12} />
						<span>Sort</span>
					</button>
				</div> */}
			</div>

			<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
				{recipes.map(recipe => (
					<div
						key={recipe.id}
						className='rounded-lg bg-[#697542]/10 p-3'>
						<div className='mb-2 flex h-24 items-center justify-center bg-[#697542] text-xs text-[#f5f1e8]'>img</div>

						<p className='text-xs text-[#cfc8b8]'>rating</p>
						<h3 className='text-sm text-[#f5f1e8]'>{recipe.title}</h3>
						<p className='text-xs text-[#cfc8b8] opacity-70'>level • duration</p>
					</div>
				))}
			</div>

			<div className='mt-6'>
				<Pagination totalPages={5} />
			</div>
		</section>
	);
}
