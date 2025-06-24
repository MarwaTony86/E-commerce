import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../context/wishListContext";

import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white"
            >
              <Link to={`/productDetails/${product._id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <p className="text-gray-600 mb-2">{product.price} EGP</p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      addProductToCart(product.id);
                      toast.success("Added to cart");
                    }}
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-900 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="text-red-500 hover:text-red-700 transition text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
