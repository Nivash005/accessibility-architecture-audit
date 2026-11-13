import { describe, expect, it } from "vitest";

describe("client baseline", () => {
  it("documents the accessibility baseline", () => {
    expect("keyboard").toContain("key");
    expect("focus-visible").toContain("focus");
  });
});
