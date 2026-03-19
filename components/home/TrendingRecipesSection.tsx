const trending = Array.from({ length: 4 }, (_, i) => ({
	id: i,
	title: 'Dish Title',
}));

export default function TrendingRecipesSection() {
	return (
		<aside className='rounded-xl bg-[#1b232b] p-4'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className='text-sm italic text-[#f5f1e8]'>Trending Recipes</h2>

				<button
					type='button'
					className='text-xs text-[#cfc8b8] transition hover:text-white'>
					See all
				</button>
			</div>

			<div className='space-y-3'>
				{trending.map((item, i) => (
					<div
						key={item.id}
						className='flex items-center gap-3 rounded-md bg-[#697542]/10 p-2'>
						<span className='text-xs text-[#8a9460]'>{String(i + 1).padStart(2, '0')}</span>

						<div className='flex h-10 w-10 items-center justify-center bg-[#697542] text-xs text-[#f5f1e8]'>img</div>

						<div className='text-xs'>
							<p className='text-[#f5f1e8]'>{item.title}</p>
							<p className='text-[#cfc8b8] opacity-70'>time • tags</p>
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}
