import { resultuple } from "resultuple"

const safeAdd = resultuple((a: number, b: number) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("cannot add - not a number")
  }
  return a + b
})
// @ts-ignore
const [addErr, addRes] = safeAdd("test", 2)
console.log(addErr, addRes)

const [addErr2, addRes2] = safeAdd(1, 2)
console.log(addErr2, addRes2)

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

const safeLoadProduct = resultuple(async (id: number) => {
  if (typeof id !== "number") {
    throw new Error("cannot load product - not a number")
  }
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await response.json()
  return product as Product
})

;(async () => {
  // @ts-ignore
  const [productErr, productRes] = await safeLoadProduct("test")
  console.log(productErr, productRes)

  const [productErr2, productRes2] = await safeLoadProduct(1)
  console.log(productErr2, productRes2)
})()
