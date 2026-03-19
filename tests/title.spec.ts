import { LOCAL_BASE_URL } from "@/playwright.config";
import { test, expect } from "@playwright/test";

test("has project title", async ({ page }) => {
  await page.goto(LOCAL_BASE_URL);

  await expect(page).toHaveTitle("FridgeChef");
});
