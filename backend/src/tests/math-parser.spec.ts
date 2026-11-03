import { createMathEvaluator, tokenize } from "../../../src/utils/mathParser";

describe("Safe MathParser Suite", () => {
  it("should tokenize and evaluate linear and quadratic functions", () => {
    const expr1 = createMathEvaluator("2*x + 1");
    expect(expr1.error).toBeUndefined();
    expect(expr1.evaluate(0)).toBe(1);
    expect(expr1.evaluate(2)).toBe(5);

    const expr2 = createMathEvaluator("x^2 - 4*x + 3");
    expect(expr2.evaluate(0)).toBe(3);
    expect(expr2.evaluate(2)).toBe(-1); // 4 - 8 + 3 = -1
  });

  it("should handle implicit multiplication (e.g., 2x, 3(x+1))", () => {
    const eval1 = createMathEvaluator("2x + 5");
    expect(eval1.error).toBeUndefined();
    expect(eval1.evaluate(3)).toBe(11);

    const eval2 = createMathEvaluator("(x+1)(x-1)");
    expect(eval2.evaluate(3)).toBe(8); // (4)(2) = 8
  });

  it("should evaluate cubic function correctly", () => {
    const cubic = createMathEvaluator("x^3 - 3x + 2");
    expect(cubic.evaluate(0)).toBe(2);
    expect(cubic.evaluate(1)).toBe(0);
    expect(cubic.evaluate(-1)).toBe(4);
  });

  it("should handle trigonometric, exponential and logarithmic functions", () => {
    const sinExpr = createMathEvaluator("sin(x)");
    expect(sinExpr.evaluate(0)).toBe(0);
    expect(sinExpr.evaluate(Math.PI / 2)).toBeCloseTo(1);

    const expExpr = createMathEvaluator("exp(x)");
    expect(expExpr.evaluate(0)).toBe(1);

    const lnExpr = createMathEvaluator("ln(x)");
    expect(lnExpr.evaluate(1)).toBe(0);
    expect(isNaN(lnExpr.evaluate(-2))).toBe(true); // Domain guard
  });

  it("should handle parameter m dynamically", () => {
    const paramExpr = createMathEvaluator("x^2 + m*x + 1");
    expect(paramExpr.evaluate(2, 3)).toBe(2 * 2 + 3 * 2 + 1); // 4 + 6 + 1 = 11
    expect(paramExpr.evaluate(2, -1)).toBe(4 - 2 + 1); // 3
  });

  it("should guard division by zero and negative square root", () => {
    const divExpr = createMathEvaluator("1 / (x - 2)");
    expect(isNaN(divExpr.evaluate(2))).toBe(true); // zero division
    expect(divExpr.evaluate(3)).toBe(1);

    const sqrtExpr = createMathEvaluator("sqrt(x)");
    expect(sqrtExpr.evaluate(4)).toBe(2);
    expect(isNaN(sqrtExpr.evaluate(-4))).toBe(true);
  });

  it("should catch syntax errors gracefully", () => {
    const invalid1 = createMathEvaluator("x + * 2");
    expect(invalid1.error).toBeDefined();

    const invalid2 = createMathEvaluator("sin(");
    expect(invalid2.error).toBeDefined();
  });
});
