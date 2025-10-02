
import { fetchApi } from "@/utils/http"
import { User } from "@/utils/type"



// ✅ Function to fetch all users
export async function getUsers( token: string ) {
  return fetchApi<User[]>({
    url: "api/auth/users",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
        Authorization: `${token}`,
    },
  })
}

