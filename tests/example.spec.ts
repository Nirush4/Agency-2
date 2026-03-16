import { LOCAL_BASE_URL } from "@/playwright.config";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(LOCAL_BASE_URL);

  await expect(page).toHaveTitle(/Create Next App/);
});

test("has Hi World heading", async ({ page }) => {
  await page.goto(LOCAL_BASE_URL);

  await expect(page.getByRole("heading", { name: "Hi World" })).toBeVisible();
});
