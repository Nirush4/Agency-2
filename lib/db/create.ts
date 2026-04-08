import { createClient } from "@/service/api/supabaseClient";

interface Post {
  title: string;
  description: string;
  cookTime: number | null;
  difficulty: string;
  calories: number | null;
  servings: number | null;
  mealType: string;
  imageUrl: string;
  createdAt?: string;
  ingredients: string[];
}

export async function createPost(post: Post) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("recipes")
    .insert([
      {
        title: post.title,
        description: post.description,
        cook_time: post.cookTime,
        difficulty: post.difficulty,
        calories: post.calories,
        servings: post.servings,
        meal_type: post.mealType,
        image_url: post.imageUrl,
        created_at: post.createdAt,
        ingredients: post.ingredients,
        owner: user.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }
}
