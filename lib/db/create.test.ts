import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/service/api/supabaseClient", () => ({
  createClient: vi.fn(),
}));

import { createPost } from "./create";
import { createClient } from "@/service/api/supabaseClient";

const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockGetUser = vi.fn();

function buildSupabaseMock() {
  mockSelect.mockReturnValue({ error: null });
  mockInsert.mockReturnValue({ select: mockSelect });
  mockFrom.mockReturnValue({ insert: mockInsert });

  return {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  };
}

const validPost = {
  title: "Pasta",
  description: "A tasty pasta dish",
  cookTime: 30,
  difficulty: "Easy",
  calories: 500,
  servings: 2,
  mealType: "Dinner",
  imageUrl: "https://example.com/pasta.jpg",
  ingredients: ["pasta", "tomato sauce"],
};

beforeEach(() => {
  vi.clearAllMocks();
  (createClient as ReturnType<typeof vi.fn>).mockReturnValue(
    buildSupabaseMock(),
  );
});

describe("createPost", () => {
  it("throws when user is not authenticated", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    await expect(createPost(validPost)).rejects.toThrow("Not authenticated");
  });

  it("inserts the recipe with the correct column mapping", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user-123" } } });

    await createPost(validPost);

    expect(mockFrom).toHaveBeenCalledWith("recipes");
    expect(mockInsert).toHaveBeenCalledWith([
      expect.objectContaining({
        title: "Pasta",
        cook_time: 30,
        meal_type: "Dinner",
        image_url: "https://example.com/pasta.jpg",
        owner: "user-123",
      }),
    ]);
  });

  it("throws when supabase returns an error", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user-123" } } });
    mockSelect.mockReturnValue({ error: { message: "DB error" } });

    await expect(createPost(validPost)).rejects.toThrow("DB error");
  });

  it("handles null optional fields without throwing", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user-123" } } });

    const postWithNulls = {
      ...validPost,
      cookTime: null,
      calories: null,
      servings: null,
    };
    await expect(createPost(postWithNulls)).resolves.not.toThrow();

    expect(mockInsert).toHaveBeenCalledWith([
      expect.objectContaining({
        cook_time: null,
        calories: null,
        servings: null,
      }),
    ]);
  });
});
