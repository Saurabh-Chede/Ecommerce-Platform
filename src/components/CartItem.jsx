import React from 'react'

function CartItem({cart,increaseQuantity,decreaseQuantity,totalAmount,totalItems}) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Cart ({totalItems} items)</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Cart is empty</p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-xl shadow border"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-32 mx-auto mb-3 object-contain"
                            />
                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                            <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                            <p className="text-gray-700 mb-2">Price: ${item.price}</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    -
                                </button>

                                <span className="text-lg font-semibold">{item.quantity}</span>

                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
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