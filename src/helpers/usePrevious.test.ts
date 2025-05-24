import { renderHook } from "@testing-library/react";
import { usePrevious } from "./usePrevious";
import { describe, it, expect } from "vitest";

describe("usePrevious", () => {
  it("should return null on first render", () => {
    const { result } = renderHook(() => usePrevious("initial"));
    expect(result.current).toBeNull();
  });

  it("should return previous string value after update", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "initial" },
    });

    // Initial render should return null
    expect(result.current).toBeNull();

    // Update the value
    rerender({ value: "updated" });

    // Now it should return the previous value
    expect(result.current).toBe("initial");

    // Update again
    rerender({ value: "final" });
    expect(result.current).toBe("updated");
  });

  it("should return previous number value after update", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 42 },
    });

    expect(result.current).toBeNull();

    rerender({ value: 100 });
    expect(result.current).toBe(42);
  });

  it("should work with objects", () => {
    const initialObj = { name: "John", age: 30 };
    const updatedObj = { name: "Jane", age: 25 };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialObj },
    });

    expect(result.current).toBeNull();

    rerender({ value: updatedObj });
    expect(result.current).toBe(initialObj);
  });

  it("should work with arrays", () => {
    const initialArray = [1, 2, 3];
    const updatedArray = [4, 5, 6];

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialArray },
    });

    expect(result.current).toBeNull();

    rerender({ value: updatedArray });
    expect(result.current).toBe(initialArray);
  });
});
