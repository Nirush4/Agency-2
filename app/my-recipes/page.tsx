import { redirect } from 'next/navigation';
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Pagination from '@/components/home/Pagination';
import AuthUserMenu from '@/components/auth/AuthUserMenu';
import { createClient } from '@/service/api/supabaseServer';

const myRecipes = Array.from({ length: 8 }, (_, i) => ({
	id: i + 1,
	title: 'My Recipe Title',
	status: i < 6 ? 'Published' : 'Draft',
	difficulty: 'Easy',
	time: '25 min',
}));

export default async function MyRecipesPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	return (
		<div className='p-4 md:p-6'>
			<div className='mb-6 flex items-center justify-end gap-3'>
				<AuthUserMenu user={user} />
			</div>

			<div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
				<div>
					<p className='text-sm uppercase tracking-[0.18em] text-[#cfc8b8]'>Dashboard</p>
					<h1 className='mt-1 text-2xl font-semibold text-[#f5f1e8] md:text-3xl'>My Recipes</h1>
				</div>

				<button
					type='button'
					className='flex items-center gap-2 self-start rounded-md bg-[#697542] px-4 py-2 text-sm font-medium text-[#f5f1e8] transition hover:bg-[#7a8550]'>
					<Plus size={16} />
					<span>Create Recipe</span>
				</button>
			</div>

			<div className='mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
				<div className='flex w-full max-w-xl items-center gap-2 rounded-lg bg-[#1b232b] px-3 py-2 text-[#cfc8b8]'>
					<Search size={16} />
					<input
						type='text'
						placeholder='Search in your recipes...'
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

			<div className='mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				<div className='rounded-xl bg-[#1b232b] p-4'>
					<p className='text-xs uppercase tracking-wider text-[#cfc8b8]'>Total Recipes</p>
					<p className='mt-2 text-2xl font-semibold text-[#f5f1e8]'>08</p>
				</div>

				<div className='rounded-xl bg-[#1b232b] p-4'>
					<p className='text-xs uppercase tracking-wider text-[#cfc8b8]'>Published</p>
					<p className='mt-2 text-2xl font-semibold text-[#f5f1e8]'>06</p>
				</div>

				<div className='rounded-xl bg-[#1b232b] p-4'>
					<p className='text-xs uppercase tracking-wider text-[#cfc8b8]'>Drafts</p>
					<p className='mt-2 text-2xl font-semibold text-[#f5f1e8]'>02</p>
				</div>

				<div className='rounded-xl bg-[#1b232b] p-4'>
					<p className='text-xs uppercase tracking-wider text-[#cfc8b8]'>Favorites</p>
					<p className='mt-2 text-2xl font-semibold text-[#f5f1e8]'>14</p>
				</div>
			</div>

			<section className='rounded-xl bg-[#1b232b] p-4'>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-sm italic text-[#f5f1e8]'>Your Recipe Collection</h2>

					<button
						type='button'
						className='text-xs text-[#cfc8b8] transition hover:text-white'>
						See all
					</button>
				</div>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
					{myRecipes.map(recipe => (
						<article
							key={recipe.id}
							className='overflow-hidden rounded-xl bg-[#697542]/10 transition hover:bg-[#697542]/15'>
							<div className='flex h-40 items-center justify-center bg-[#697542] text-sm text-[#f5f1e8]'>image</div>

							<div className='p-4'>
								<div className='mb-2 flex items-center justify-between'>
									<span
										className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-wide ${
											recipe.status === 'Published' ? 'bg-[#697542] text-[#f5f1e8]' : 'bg-[#3b4350] text-[#cfc8b8]'
										}`}>
										{recipe.status}
									</span>

									<span className='text-xs text-[#cfc8b8]'>placeholder</span>
								</div>

								<h3 className='text-lg font-semibold text-[#f5f1e8]'>{recipe.title}</h3>

								<p className='mt-2 text-xs text-[#cfc8b8]'>
									{recipe.difficulty} • {recipe.time}
								</p>

								<div className='mt-4 flex gap-2'>
									<button
										type='button'
										className='rounded-md bg-[#697542] px-3 py-2 text-xs text-[#f5f1e8] transition hover:bg-[#7a8550]'>
										Edit
									</button>

									<button
										type='button'
										className='rounded-md border border-[#8a9460]/30 bg-transparent px-3 py-2 text-xs text-[#cfc8b8] transition hover:bg-[#697542]/10 hover:text-[#f5f1e8]'>
										View
									</button>
								</div>
							</div>
						</article>
					))}
				</div>

				<div className='mt-6'>
					<Pagination totalPages={5} />
				</div>
			</section>
		</div>
	);
}
