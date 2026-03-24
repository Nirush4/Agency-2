import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function SearchBar() {
	return (
		<div className='mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
			<div className='flex w-full max-w-xl items-center gap-2 rounded-lg bg-[#1b232b] px-3 py-2 text-[#cfc8b8]'>
				<Search size={16} />
				<input
					type='text'
					placeholder='Search recipes, ingredients, cuisines...'
					className='w-full bg-transparent text-sm outline-none placeholder:text-[#a8a08f]'
				/>
			</div>

			<div className='flex items-center gap-2 self-start lg:self-auto'>
				<button
					type='button'
					className='flex items-center gap-2 rounded-md bg-[#697542] px-3 py-2 text-xs text-[#f5f1e8] transition hover:bg-[#7a8550]'>
					<SlidersHorizontal size={14} />
					<span>Filter</span>
				</button>

				<button
					type='button'
					className='flex items-center gap-2 rounded-md bg-[#697542] px-3 py-2 text-xs text-[#f5f1e8] transition hover:bg-[#7a8550]'>
					<ArrowUpDown size={14} />
					<span>Sort</span>
				</button>
			</div>
		</div>
	);
}
