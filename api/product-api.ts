// ✅ utils/api/products.ts
import { fetchApi } from "@/utils/http"
import { CreateProduct, GetProduct } from "@/utils/type"


// Function to create a product
export async function createProduct(token: string, product: CreateProduct) {
  return fetchApi<CreateProduct>({
    url: "api/products/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(product),
  });
}


//get all products api
export async function fetchProducts(token: string) {
  return fetchApi<GetProduct[]>({
    url: "api/products/get",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
}
