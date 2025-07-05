import { Link } from "react-router-dom";
function CartItem({ cart, increaseQuantity, decreaseQuantity, totalAmount, totalItems }) {
    return (
        <div className='flex flex-col'>
            <h2 className="text-2xl font-bold mb-4">Cart ({totalItems} items)</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Cart is empty</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white w-[160px] p-4 rounded-xl shadow border"
                        >
                            <Link to={`/product/${item.id}`} className="flex items-center gap-3 hover:underline">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-28 mx-auto mb-3 object-contain"
                                />
                            </Link>
                            {/* <h3 className="text-lg font-semibold mb-1">{item.title}</h3> */}
                            <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                            <p className="text-gray-700 mb-2">Price: ${item.price}</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-black text-white px-3 py-1 rounded"
                                >
                                    -
                                </button>

                                <span className="text-lg font-semibold">{item.quantity}</span>

                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-black text-white px-3 py-1 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h3 className="text-xl font-bold mt-4">🧾 Total: ${totalAmount}</h3>
        </div>
    )
}

export default CartItem