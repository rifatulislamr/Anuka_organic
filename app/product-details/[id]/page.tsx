import '../../globals.css'
import ProductDetails from "@/components/product/product-details"
import { products } from "@/data/products"


// Make this async so we can await params
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === parseInt(id))

  if (!product) return <div>Product not found</div>

  return <ProductDetails product={product} />
}
