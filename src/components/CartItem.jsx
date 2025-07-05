// import { Link } from "react-router-dom";
// function CartItem({ cart, increaseQuantity, decreaseQuantity, totalAmount, totalItems }) {
//     return (
//         <div className='flex flex-col'>
//             <h2 className="text-2xl font-bold mb-4">Cart ({totalItems} items)</h2>
//             {cart.length === 0 ? (
//                 <p className="text-gray-600">Cart is empty</p>
//             ) : (
//                 <div className="flex flex-col gap-4">
//                     {cart.map((item) => (
//                         <div
//                             key={item.id}
//                             className="bg-white w-[160px] p-4 rounded-xl shadow border"
//                         >
//                             <Link to={`/product/${item.id}`} className="flex items-center gap-3 hover:underline">
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="h-28 mx-auto mb-3 object-contain"
//                                 />
//                             </Link>
//                             {/* <h3 className="text-lg font-semibold mb-1">{item.title}</h3> */}
//                             <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
//                             <p className="text-gray-700 mb-2">Price: ${item.price}</p>
//                             <div className="flex items-center gap-4">
//                                 <button
//                                     onClick={() => decreaseQuantity(item.id)}
//                                     className="bg-black text-white px-3 py-1 rounded"
//                                 >
//                                     -
//                                 </button>

//                                 <span className="text-lg font-semibold">{item.quantity}</span>

//                                 <button
//                                     onClick={() => increaseQuantity(item.id)}
//                                     className="bg-black text-white px-3 py-1 rounded"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <h3 className="text-xl font-bold mt-4">🧾 Total: ${totalAmount}</h3>
//         </div>
//     )
// }

// export default CartItem


import { Minus, Plus, Trash2 } from "lucide-react"

function CartItem({ cart, decreaseQuantity, increaseQuantity, totalAmount, totalItems }) {
  if (cart.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          {/* Product Image */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
            {item.image ? (
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
            <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              {item.quantity === 1 ? (
                <Trash2 size={12} className="text-red-500" />
              ) : (
                <Minus size={12} className="text-gray-600" />
              )}
            </button>

            <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <Plus size={12} className="text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItem
