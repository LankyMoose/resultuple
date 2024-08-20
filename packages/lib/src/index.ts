import { SymbolResult } from "./polyfill.js"
import type { ResultTuple } from "./polyfill"

export function resultuple<const Fn extends (...args: any) => any>(fn: Fn) {
  return function (...args: Parameters<Fn>): ResultTuple<ReturnType<Fn>> {
    return fn[SymbolResult](...args)
  }
}
