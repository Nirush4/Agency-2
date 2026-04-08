"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPost } from "@/lib/db/create";

export default function CreatePageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    cookTime: "",
    difficulty: "",
    calories: "",
    servings: "",
    mealType: "",
    imageUrl: "",
    ingredients: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      cookTime: form.cookTime ? Number(form.cookTime) : null,
      servings: form.servings ? Number(form.servings) : null,
      calories: form.calories ? Number(form.calories) : null,
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((ing) => ing.trim())
        : [],
      createdAt: new Date().toISOString(),
    };

    try {
      await createPost(payload);
      toast.success("Recipe created successfully!");
      router.push("/");
    } catch (err) {
      toast.error((err as Error).message || "Failed to create recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg bg-gray-700 p-6 shadow-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Recipe title"
            className="input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your recipe"
            className="input border-white border-solid flex"
          />
        </div>

        <div className="flex flex-col">
          <label>Cook Time (minutes)</label>
          <input
            type="number"
            name="cookTime"
            value={form.cookTime}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={form.servings}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Calories</label>
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Difficulty</label>
          <input
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            placeholder="Easy / Medium / Hard"
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Meal Type</label>
          <input
            name="mealType"
            value={form.mealType}
            onChange={handleChange}
            placeholder="Breakfast, Dinner..."
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="border-white border-solid flex"
          />
        </div>

        <div className="flex flex-col">
          <label>Ingredients</label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Comma separated ingredients"
            className=" border-white border-solid flex"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </div>
    </form>
  );
}
