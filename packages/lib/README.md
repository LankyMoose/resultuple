# **resultuple**

### Simplify and make functions safe!

#### _Resultaple is a package designed to push and encourage the usage of the "safe assignment operator" proposal currently under development - https://github.com/arthurfiorette/proposal-safe-assignment-operator_

<br />

### Usage

```ts
const safeLoadProduct = resultuple(async (id: number) => {
  if (typeof id !== "number") {
    throw new Error("cannot load product - not a number")
  }
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await response.json()
  return product as Product
})

const [error, result] = await safeLoadProduct("obviously not a number")
//      ^? [Error, null]

const [error2, result2] = await safeLoadProduct(42)
//      ^? [null, Product]
```
