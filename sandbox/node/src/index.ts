import { resultuple } from "resultuple"

const safeAdd = resultuple((a: number, b: number) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Not a number")
  }
  return a + b
})
// @ts-ignore
const [err, result] = safeAdd("1", 2)
console.log(err, result)
