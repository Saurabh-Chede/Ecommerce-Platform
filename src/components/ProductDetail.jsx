import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useCart} from '../context/CartContext'

function ProductDetail({products}) {
  const { id } = useParams(); // Get product ID from URL
 
  const navigate = useNavigate()
   
  const {cart,addToCart,increaseQuantity, decreaseQuantity} = useCart()
   const product = products.find((item) => item.id.toString() === id);

  // useEffect(() => {
  //   fetch(`https://fakestoreapi.com/products/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setProduct(data));
  // }, [id]);

  if (!product) return <p>Loading...</p>;

  const isInCart = cart.find((item) => item.id === product.id)

  return (
    <div className="max-w-xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Go Back</button>
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <img src={product.image} alt={product.title} className="h-60 mb-4" />
      <p className="text-lg font-semibold">₹{product.price}</p>
      <p className="mt-2 text-gray-700">{product.description}</p>

       <div className="mt-6">
        {isInCart ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="px-3 py-1 bg-black text-white rounded"
            >
              -
            </button>
            <span>{isInCart.quantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="px-3 py-1 bg-black text-white rounded"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 mt-4 bg-black text-white rounded"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
