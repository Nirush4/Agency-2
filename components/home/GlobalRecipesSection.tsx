const countries = Array.from({ length: 6 }, () => 'country');

export default function GlobalRecipesSection() {
	return (
		<section className='rounded-xl bg-[#1b232b] p-4'>
			<h2 className='mb-4 text-sm italic text-[#f5f1e8]'>Find Global Recipes</h2>

			<div className='grid grid-cols-2 gap-3'>
				{countries.map((country, i) => (
					<div
						key={i}
						className='rounded-md bg-[#697542]/20 p-3 text-center text-sm text-[#cfc8b8]'>
						{country}
					</div>
				))}
			</div>
		</section>
	);
}
