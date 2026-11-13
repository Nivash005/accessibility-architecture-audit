import { describe, expect, it } from "vitest";
import { listServices } from "../src/services.js";

describe("service catalogue", () => {
  it("returns services with stable IDs and accessible names", () => {
    const result = listServices();
    expect(result.length).toBeGreaterThan(0);
    for (const item of result) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });
});
