import { SymbolResult } from "./polyfill.js"
import type { ResultTuple } from "./polyfill"

export { SymbolResult }

export function resultuple<const Fn extends (...args: any) => any>(fn: Fn) {
  return function (
    ...args: Parameters<Fn>
  ): ReturnType<Fn> extends Promise<infer T>
    ? Promise<ResultTuple<T>>
    : ResultTuple<ReturnType<Fn>> {
    return fn[SymbolResult](...args) as any
  }
}
