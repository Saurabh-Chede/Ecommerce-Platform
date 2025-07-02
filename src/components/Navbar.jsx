import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    return (


        <nav className="flex items-center justify-between w-full">
            <ul className="flex gap-4 items-center">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>

            <Link to="/cart" className="bg-blue-500 text-white px-4 py-1 rounded">
                Cart
            </Link>
        </nav>

    )
}

export default Navbar