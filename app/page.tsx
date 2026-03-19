import { createClient } from '@/service/api/supabaseServer';

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default async function Home() {
	const supabase = await createClient();

	const { data: recipes } = await supabase.from('recipes').select();

	return (
		<article className='p-4 max-w-2xl mx-auto'>
			<h1 className='font-bold text-2xl text-center'>Recipes</h1>
			<ul>
				{recipes?.map((recipe: Todo) => (
					<li key={recipe.id}>{recipe.title}</li>
				))}
			</ul>
		</article>
	);
}
