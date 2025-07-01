import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <img src={product.image} alt={product.title} className="h-60 mb-4" />
      <p className="text-lg font-semibold">₹{product.price}</p>
      <p className="mt-2 text-gray-700">{product.description}</p>
    </div>
  );
}

export default ProductDetail;
