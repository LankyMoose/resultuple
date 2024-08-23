//https://github.com/arthurfiorette/proposal-safe-assignment-operator/blob/main/polyfill.js

export const SymbolResult = Symbol("result")
Symbol.result = SymbolResult

export type ResultTuple<T> = [Error, null] | [null, T]

declare global {
  export interface SymbolConstructor {
    result: symbol
  }

  export interface Function {
    [SymbolResult]<T extends (...args: any) => any>(
      this: T,
      ...args: Parameters<T>
    ): ResultTuple<ReturnType<T>>
  }

  export interface Promise<T> {
    [SymbolResult](): Promise<ResultTuple<T>>
  }
}

Function.prototype[SymbolResult] = function <T>(...args: any): ResultTuple<T> {
  try {
    const result = this.apply(this, args)

    // Handles recursive cases, like async function() {}
    // or user made implementations like function() { return objectWithSymbolResult }
    if (result && typeof result === "object" && Symbol.result in result) {
      return result[Symbol.result]()
    }

    return [null, result] as const
  } catch (error) {
    // throw undefined would break the pattern of destructuring the result type.
    // in [error, data], both error and data would be undefined
    return [
      error instanceof Error
        ? error
        : new Error("Thrown error is falsy", { cause: error }),
      null,
    ] as const
  }
}

Promise.prototype[SymbolResult] = async function <T>(): Promise<
  ResultTuple<T>
> {
  try {
    const result = await this
    return [null, result] as const
  } catch (error) {
    return [
      error instanceof Error
        ? error
        : new Error("Thrown error is falsy", { cause: error }),
      null,
    ] as const
  }
}
