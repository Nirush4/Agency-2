import { expect, it } from "vitest";
import { forVitest } from "./vitestUtils";

it("forVitest adds two numbers correctly", () => {
  expect(forVitest(2, 3)).toBe(5);
});
