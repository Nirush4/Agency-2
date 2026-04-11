import { LOCAL_BASE_URL } from "@/playwright.config";
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads", async ({ page }) => {
    await page.goto(LOCAL_BASE_URL);
    await expect(page).toHaveURL(LOCAL_BASE_URL + "/");
  });

  test("navigates to login page", async ({ page }) => {
    await page.goto(`${LOCAL_BASE_URL}/login`);
    await expect(page).toHaveURL(`${LOCAL_BASE_URL}/login`);
  });

  test("navigates to register page", async ({ page }) => {
    await page.goto(`${LOCAL_BASE_URL}/register`);
    await expect(page).toHaveURL(`${LOCAL_BASE_URL}/register`);
  });

  test("navigates to my-fridge page", async ({ page }) => {
    await page.goto(`${LOCAL_BASE_URL}/my-fridge`);
    await expect(page).toHaveURL(`${LOCAL_BASE_URL}/my-fridge`);
  });

  test("navigates to settings page", async ({ page }) => {
    await page.goto(`${LOCAL_BASE_URL}/settings`);
    await expect(page).toHaveURL(`${LOCAL_BASE_URL}/settings`);
  });

  test("desktop sidebar logo link returns to home", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${LOCAL_BASE_URL}/settings`);
    await page.getByRole("link", { name: "Logo", exact: true }).click();
    await expect(page).toHaveURL(LOCAL_BASE_URL + "/");
  });

  test("desktop sidebar nav links are visible", async ({ page }) => {
    await page.goto(LOCAL_BASE_URL);
    await page.setViewportSize({ width: 1280, height: 800 });

    await expect(page.getByRole("link", { name: "My Recipes" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Fridge" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Weekly Planner" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("mobile bottom nav links are visible", async ({ page }) => {
    await page.goto(LOCAL_BASE_URL);
    await page.setViewportSize({ width: 375, height: 812 });

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Fridge" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Planner" })).toBeVisible();
  });
});
