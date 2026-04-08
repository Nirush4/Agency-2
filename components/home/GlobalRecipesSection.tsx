import Image from "next/image";
import type { Recipe } from "@/app/page";

export default function GlobalRecipesSection({
  recipes,
}: {
  recipes: Recipe[];
}) {
  return (
    <section className="rounded-xl bg-[#1b232b] p-4">
      <h2 className="mb-4 text-sm italic text-[#f5f1e8]">
        Find Global Recipes
      </h2>

      {recipes.length === 0 ? (
        <p className="text-sm text-[#cfc8b8] opacity-70">No recipes yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {recipes.slice(0, 6).map((recipe, i) => (
            <div
              key={recipe.id}
              className="rounded-md bg-[#697542]/20 p-3 text-sm text-[#cfc8b8]"
            >
              {recipe.image_url ? (
                <Image
                  src={recipe.image_url}
                  alt={recipe.title}
                  width={200}
                  height={96}
                  className="mb-2 h-24 w-full rounded object-cover"
                  style={{ width: "100%", height: "auto" }}
                  {...(i === 0
                    ? { priority: true }
                    : { loading: "lazy" as const })}
                />
              ) : (
                <div className="mb-2 flex h-24 items-center justify-center rounded bg-[#697542] text-xs text-[#f5f1e8]">
                  No image
                </div>
              )}
              <p className="font-medium text-[#f5f1e8]">{recipe.title}</p>
              {recipe.meal_type && (
                <p className="text-xs opacity-70">{recipe.meal_type}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
