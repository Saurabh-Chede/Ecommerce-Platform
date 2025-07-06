import React, { useState } from 'react'

function AdminDashboard({ onAddProduct }) {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            id: Date.now(),
            title,
            price: parseFloat(price),
            image,
            description,
        }

        onAddProduct(newProduct);
        setTitle('')
        setPrice('')
        setImage('')
        setDescription('')

        console.log("New product submitted:", newProduct);
        console.log("onAddProduct fn:", onAddProduct);

    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <textarea
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default AdminDashboard