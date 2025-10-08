import { fetchApi } from "@/utils/http";
import { GetCart } from "@/utils/type";

//get all carts api
export async function fetchCarts(token: string) {
  return fetchApi<GetCart[]>({
    url: "api/cart/get-cart",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
}

// ✅ Create a new cart
export async function createCart(
  token: string,
  data: { userId: number; productId: number }
) {
  return fetchApi<GetCart>({
    url: 'api/cart/create-cart',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(data),
  })
}

// ✅ Delete a cart by productId
export async function deleteCart(token: string, productId: number) {
  return fetchApi({
    url: `api/cart/delete-cart/${productId}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })
}