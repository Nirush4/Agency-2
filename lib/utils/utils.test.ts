import { test, expect } from "vitest";
import { forVitest } from "./utils";

test("forVitest adds two numbers correctly", () => {
  expect(forVitest(2, 3)).toBe(5);
});
