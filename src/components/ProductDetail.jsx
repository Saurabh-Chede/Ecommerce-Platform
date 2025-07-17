// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {useCart} from '../context/CartContext'

// function ProductDetail({products}) {
//   const { id } = useParams(); // Get product ID from URL
 
//   const navigate = useNavigate()
   
//   const {cart,addToCart,increaseQuantity, decreaseQuantity} = useCart()
//    const product = products.find((item) => item.id.toString() === id);

//   // useEffect(() => {
//   //   fetch(`https://fakestoreapi.com/products/${id}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setProduct(data));
//   // }, [id]);

//   if (!product) return <p>Loading...</p>;

//   const isInCart = cart.find((item) => item.id === product.id)

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Go Back</button>
//       <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
//       <img src={product.image} alt={product.title} className="h-60 mb-4" />
//       <p className="text-lg font-semibold">₹{product.price}</p>
//       <p className="mt-2 text-gray-700">{product.description}</p>

//        <div className="mt-6">
//         {isInCart ? (
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => decreaseQuantity(product.id)}
//               className="px-3 py-1 bg-black text-white rounded"
//             >
//               -
//             </button>
//             <span>{isInCart.quantity}</span>
//             <button
//               onClick={() => increaseQuantity(product.id)}
//               className="px-3 py-1 bg-black text-white rounded"
//             >
//               +
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => addToCart(product)}
//             className="px-4 py-2 mt-4 bg-black text-white rounded"
//           >
//             Add to Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const product = products.find((item) => item.id.toString() === id);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const isInCart = cart.find((item) => item.id === product.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-sm">
        ← Go Back
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-64 object-contain rounded-lg"
            />
          </div>

          <div>
            <Badge className="mb-2">{product.category}</Badge>

            <p className="text-xl font-semibold text-gray-900 mb-1">₹{product.price}</p>
            <Separator className="mb-3" />
            <p className="text-gray-700 text-sm">{product.description}</p>

            <div className="mt-6">
              {isInCart ? (
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    −
                  </Button>
                  <span className="font-medium">{isInCart.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </Button>
                </div>
              ) : (
                <Button
                  className="mt-2 w-full bg-black text-white hover:bg-gray-900"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetail;

