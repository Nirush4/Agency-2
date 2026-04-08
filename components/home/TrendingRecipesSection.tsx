import Image from "next/image";
import type { Recipe } from "@/app/page";

export default function TrendingRecipesSection({
  recipes,
}: {
  recipes: Recipe[];
}) {
  return (
    <aside className="rounded-xl bg-[#1b232b] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm italic text-[#f5f1e8]">Trending Recipes</h2>

        <button
          type="button"
          className="text-xs text-[#cfc8b8] transition hover:text-white"
        >
          See all
        </button>
      </div>

      <div className="space-y-3">
        {recipes.length === 0 ? (
          <p className="text-sm text-[#cfc8b8] opacity-70">No recipes yet.</p>
        ) : (
          recipes.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md bg-[#697542]/10 p-2"
            >
              <span className="text-xs text-[#8a9460]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#697542]">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  <span className="text-xs text-[#f5f1e8]">img</span>
                )}
              </div>

              <div className="text-xs">
                <p className="text-[#f5f1e8]">{item.title}</p>
                <p className="text-[#cfc8b8] opacity-70">
                  {item.cook_time ? `${item.cook_time} min` : "—"} •{" "}
                  {item.meal_type ?? "—"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
