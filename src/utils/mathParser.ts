/**
 * Safe Mathematical Expression Parser and Evaluator for Math12Pro.
 * Zero use of eval() or new Function(). Uses Tokenizer + Recursive Descent AST.
 */

export type TokenType =
  | "NUMBER"
  | "IDENTIFIER"
  | "OPERATOR"
  | "LPAREN"
  | "RPAREN"
  | "COMMA";

export interface Token {
  type: TokenType;
  value: string;
}

export type ASTNode =
  | { type: "NUMBER"; value: number }
  | { type: "VARIABLE"; name: string }
  | { type: "UNARY_OP"; op: "+" | "-"; argument: ASTNode }
  | { type: "BINARY_OP"; op: "+" | "-" | "*" | "/" | "^"; left: ASTNode; right: ASTNode }
  | { type: "FUNCTION_CALL"; name: string; args: ASTNode[] };

/**
 * Tokenize mathematical expression into tokens.
 * Handles implicit multiplication like 2x, (x+1)(x-1), 3sin(x).
 */
export function tokenize(rawInput: string): Token[] {
  let input = rawInput.trim();
  // Strip "y =" or "f(x) =" if user typed it
  input = input.replace(/^(?:y|f\(x\))\s*=\s*/i, "").trim();

  // Normalize implicit multiplications
  // e.g. 2x -> 2*x, 2(x) -> 2*(x), (x+1)(x-2) -> (x+1)*(x-2), x(x+1) -> x*(x+1)
  input = input
    .replace(/(\d)\s*([a-zA-Z(])/g, "$1*$2")
    .replace(/(\))\s*([a-zA-Z0-9(])/g, "$1*$2")
    .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(\()/g, (match, p1) => {
      const funcs = ["sin", "cos", "tan", "sqrt", "ln", "log", "exp", "abs"];
      if (funcs.includes(p1.toLowerCase())) return `${p1}(`;
      return `${p1}*(`;
    });

  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (/[0-9.]/.test(char)) {
      let numStr = "";
      while (i < input.length && /[0-9.]/.test(input[i])) {
        numStr += input[i];
        i++;
      }
      tokens.push({ type: "NUMBER", value: numStr });
      continue;
    }

    if (/[a-zA-Z_]/.test(char)) {
      let idStr = "";
      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
        idStr += input[i];
        i++;
      }
      tokens.push({ type: "IDENTIFIER", value: idStr });
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "LPAREN", value: "(" });
      i++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "RPAREN", value: ")" });
      i++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "COMMA", value: "," });
      i++;
      continue;
    }

    if ("+-*/^".includes(char)) {
      tokens.push({ type: "OPERATOR", value: char });
      i++;
      continue;
    }

    throw new Error(`Ký tự không hợp lệ trong biểu thức: '${char}'`);
  }

  return tokens;
}

/**
 * Parser: Recursive Descent Parser building an AST.
 */
class ExpressionParser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private consume(expectedValue?: string): Token {
    const token = this.tokens[this.pos];
    if (!token) {
      throw new Error("Biểu thức kết thúc bất ngờ");
    }
    if (expectedValue && token.value !== expectedValue) {
      throw new Error(`Mong đợi '${expectedValue}' nhưng gặp '${token.value}'`);
    }
    this.pos++;
    return token;
  }

  public parse(): ASTNode {
    const node = this.parseAdditionSubtraction();
    if (this.pos < this.tokens.length) {
      throw new Error(`Cú pháp không hợp lệ gần '${this.tokens[this.pos].value}'`);
    }
    return node;
  }

  // Precedence 1: Addition & Subtraction (+, -)
  private parseAdditionSubtraction(): ASTNode {
    let left = this.parseMultiplicationDivision();

    while (this.peek() && (this.peek()!.value === "+" || this.peek()!.value === "-")) {
      const op = this.consume().value as "+" | "-";
      const right = this.parseMultiplicationDivision();
      left = { type: "BINARY_OP", op, left, right };
    }

    return left;
  }

  // Precedence 2: Multiplication & Division (*, /)
  private parseMultiplicationDivision(): ASTNode {
    let left = this.parsePower();

    while (this.peek() && (this.peek()!.value === "*" || this.peek()!.value === "/")) {
      const op = this.consume().value as "*" | "/";
      const right = this.parsePower();
      left = { type: "BINARY_OP", op, left, right };
    }

    return left;
  }

  // Precedence 3: Power (^) - Right Associative
  private parsePower(): ASTNode {
    const base = this.parseUnary();

    if (this.peek() && this.peek()!.value === "^") {
      this.consume("^");
      const exponent = this.parsePower(); // right associative recursion
      return { type: "BINARY_OP", op: "^", left: base, right: exponent };
    }

    return base;
  }

  // Precedence 4: Unary (+, -)
  private parseUnary(): ASTNode {
    if (this.peek() && (this.peek()!.value === "+" || this.peek()!.value === "-")) {
      const op = this.consume().value as "+" | "-";
      const argument = this.parseUnary();
      return { type: "UNARY_OP", op, argument };
    }

    return this.parsePrimary();
  }

  // Precedence 5: Numbers, Identifiers, Function Calls, Parentheses
  private parsePrimary(): ASTNode {
    const token = this.peek();
    if (!token) {
      throw new Error("Mong đợi một giá trị hoặc biểu thức");
    }

    if (token.type === "NUMBER") {
      this.consume();
      const val = parseFloat(token.value);
      if (isNaN(val)) throw new Error(`Số không hợp lệ: ${token.value}`);
      return { type: "NUMBER", value: val };
    }

    if (token.type === "IDENTIFIER") {
      const idToken = this.consume();
      const name = idToken.value.toLowerCase();

      // Check if it's a function call like sin(x)
      if (this.peek() && this.peek()!.type === "LPAREN") {
        this.consume("(");
        const args: ASTNode[] = [];
        if (this.peek() && this.peek()!.type !== "RPAREN") {
          args.push(this.parseAdditionSubtraction());
          while (this.peek() && this.peek()!.type === "COMMA") {
            this.consume(",");
            args.push(this.parseAdditionSubtraction());
          }
        }
        this.consume(")");
        return { type: "FUNCTION_CALL", name, args };
      }

      // Constants
      if (name === "pi") {
        return { type: "NUMBER", value: Math.PI };
      }
      if (name === "e") {
        return { type: "NUMBER", value: Math.E };
      }

      // Variable (e.g. x, m)
      return { type: "VARIABLE", name };
    }

    if (token.type === "LPAREN") {
      this.consume("(");
      const node = this.parseAdditionSubtraction();
      this.consume(")");
      return node;
    }

    throw new Error(`Cú pháp không mong đợi gần '${token.value}'`);
  }
}

/**
 * Evaluate AST Node at given variable scope safely.
 */
export function evaluateAST(node: ASTNode, scope: { x: number; m?: number }): number {
  switch (node.type) {
    case "NUMBER":
      return node.value;

    case "VARIABLE": {
      if (node.name === "x") return scope.x;
      if (node.name === "m") return scope.m ?? 1;
      // Default fallback
      return NaN;
    }

    case "UNARY_OP": {
      const arg = evaluateAST(node.argument, scope);
      return node.op === "-" ? -arg : arg;
    }

    case "BINARY_OP": {
      const left = evaluateAST(node.left, scope);
      const right = evaluateAST(node.right, scope);

      if (isNaN(left) || isNaN(right)) return NaN;

      switch (node.op) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          if (Math.abs(right) < 1e-12) return NaN; // Division by zero guard
          return left / right;
        case "^": {
          if (left < 0 && !Number.isInteger(right)) return NaN; // Real domain guard
          return Math.pow(left, right);
        }
      }
      break;
    }

    case "FUNCTION_CALL": {
      const evaluatedArgs = node.args.map((a) => evaluateAST(a, scope));
      const arg = evaluatedArgs[0];
      if (isNaN(arg)) return NaN;

      switch (node.name) {
        case "sin":
          return Math.sin(arg);
        case "cos":
          return Math.cos(arg);
        case "tan": {
          // Guard vertical asymptotes of tan(x) at pi/2 + k*pi
          const rem = Math.abs(arg % Math.PI);
          if (Math.abs(rem - Math.PI / 2) < 1e-6) return NaN;
          return Math.tan(arg);
        }
        case "sqrt":
          return arg < 0 ? NaN : Math.sqrt(arg);
        case "ln":
        case "log":
          return arg <= 0 ? NaN : Math.log(arg);
        case "exp":
          return Math.exp(arg);
        case "abs":
          return Math.abs(arg);
        default:
          return NaN;
      }
    }
  }

  return NaN;
}

/**
 * Public High-Level Evaluator Factory.
 * Pre-parses AST once for blazing-fast 60fps graph rendering.
 */
export function createMathEvaluator(rawExpr: string): {
  evaluate: (x: number, m?: number) => number;
  error?: string;
  latex?: string;
} {
  try {
    if (!rawExpr || rawExpr.trim().length === 0) {
      return {
        evaluate: () => NaN,
        error: "Biểu thức trống",
      };
    }

    const tokens = tokenize(rawExpr);
    const parser = new ExpressionParser(tokens);
    const ast = parser.parse();

    return {
      evaluate: (x: number, m?: number) => {
        try {
          const val = evaluateAST(ast, { x, m });
          return isFinite(val) ? val : NaN;
        } catch {
          return NaN;
        }
      },
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Cú pháp hàm số không hợp lệ";
    return {
      evaluate: () => NaN,
      error: errorMsg,
    };
  }
}
