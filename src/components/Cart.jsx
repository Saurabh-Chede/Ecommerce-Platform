import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Pagination from "./Pagination"
import Footer from "./Footer"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


function Cart({ products }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  const itemsPerPage = 6
  const { addToCart } = useCart()
  
  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filterProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage)

  return (
    <>
      <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 font-sans mb-8">

        <div className="my-6 flex justify-center">
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase())
              setCurrentPage(1)
            }}
            className="w-full sm:w-96"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className="w-full max-w-xs sm:max-w-sm hover:shadow-md transition"
            >
              <Link
                to={`/product/${product.id}`}
                className="p-5 h-[250px] flex flex-col justify-between text-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 mx-auto mb-3 object-contain"
                />
                <div className="flex-1">
                  <h2 className="text-md font-semibold mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-700 text-lg">${product.price}</p>
                </div>
              </Link>

              <CardContent className="flex justify-center">
                <Button onClick={() => addToCart(product)} className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  )
}

export default Cart
