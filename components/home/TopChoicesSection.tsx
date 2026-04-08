import Image from "next/image";
import Pagination from "@/components/home/Pagination";
import type { Recipe } from "@/app/page";

export default function TopChoicesSection({ recipes }: { recipes: Recipe[] }) {
  return (
    <section className="mt-6 rounded-xl bg-[#1b232b] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm italic text-[#f5f1e8]">Top Choices for You</h2>
      </div>

      {recipes.length === 0 ? (
        <p className="text-sm text-[#cfc8b8] opacity-70">
          No recipes yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="rounded-lg bg-[#697542]/10 p-3">
              {recipe.image_url ? (
                <Image
                  src={recipe.image_url}
                  alt={recipe.title}
                  width={200}
                  height={96}
                  className="mb-2 h-24 w-full rounded object-cover"
                  style={{ width: "100%", height: "auto" }}
                  loading="lazy"
                />
              ) : (
                <div className="mb-2 flex h-24 items-center justify-center rounded bg-[#697542] text-xs text-[#f5f1e8]">
                  No image
                </div>
              )}

              <p className="text-xs text-[#cfc8b8]">
                {recipe.difficulty ?? "—"}
              </p>
              <h3 className="text-sm text-[#f5f1e8]">{recipe.title}</h3>
              <p className="text-xs text-[#cfc8b8] opacity-70">
                {recipe.difficulty ?? "—"} •{" "}
                {recipe.cook_time ? `${recipe.cook_time} min` : "—"}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Pagination totalPages={5} />
      </div>
    </section>
  );
}
