import { resultuple, SymbolResult } from "resultuple"

const add = (a: number, b: number) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("cannot add - not a number")
  }
  return a + b
}
const safeAdd = resultuple(add)
// @ts-ignore
const [addErr, addRes] = safeAdd("test", 2)
console.log("safeAdd (fail)", addErr?.message, addRes)

const [addErr2, addRes2] = safeAdd(1, 2)
console.log("safeAdd", addErr2?.message, addRes2)

const [addErr3, addRes3] = add[SymbolResult](1, 2)
console.log("safeAdd [SymbolResult]", addErr3?.message, addRes3)

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const loadProduct = async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (
    response.status !== 200 ||
    !response.ok ||
    response.headers.get("content-length") === "0"
  ) {
    throw new Error("failed to load product")
  }
  const product = await response.json()
  return product as Product
}
const safeLoadProduct = resultuple(loadProduct)

;(async () => {
  // @ts-ignore
  const [productErr, productRes] = await safeLoadProduct("test")
  console.log("() => Promise (fail)", productErr?.message, productRes)

  const [productErr2, productRes2] = await safeLoadProduct(1)
  console.log("() => Promise", productErr2?.message, productRes2)

  const promise = loadProduct(2)
  const [productErr3, productRes3] = await promise[SymbolResult]()
  console.log("Promise[SymbolResult]():", productErr3?.message, productRes3)
})()
