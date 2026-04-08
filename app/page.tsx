import HeroSection from "@/components/home/HeroSection";
import HomeTopBar from "@/components/home/HomeTopBar";
import SearchBar from "@/components/home/SearchBar";
import GlobalRecipesSection from "@/components/home/GlobalRecipesSection";
import TrendingRecipesSection from "@/components/home/TrendingRecipesSection";
import TopChoicesSection from "@/components/home/TopChoicesSection";
import { createClient } from "@/service/api/supabaseServer";

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  cook_time: number | null;
  difficulty: string | null;
  calories: number | null;
  servings: number | null;
  meal_type: string | null;
  image_url: string | null;
  created_at: string | null;
  views_count: number | null;
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data: recipes } = await supabase
    .from("recipes")
    .select(
      "id, title, description, cook_time, difficulty, calories, servings, meal_type, image_url, created_at, views_count",
    )
    .order("created_at", { ascending: false });

  const allRecipes: Recipe[] = recipes ?? [];
  const trending = [...allRecipes]
    .sort((a, b) => (b.views_count ?? 0) - (a.views_count ?? 0))
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6">
      <HomeTopBar />

      <div className="mb-6">
        <HeroSection />
      </div>

      <SearchBar />

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <GlobalRecipesSection recipes={allRecipes} />
        <TrendingRecipesSection recipes={trending} />
      </div>

      <TopChoicesSection recipes={allRecipes} />
    </div>
  );
}
