import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartSheet() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    decreaseQuantity,
    increaseQuantity,
    totalAmount,
  } = useCart();
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 px-2.5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(item.id)}>
                    {item.quantity === 1 ? (
                      <Trash2 size={12} />
                    ) : (
                      <Minus size={12} />
                    )}
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 px-2.5">
            <div className="flex justify-between text-sm font-medium px-2">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4"><Link to="/checkout">Checkout</Link></Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
