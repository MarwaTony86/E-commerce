
import axios from "axios";
import { useContext } from "react";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";
import CategorySlider from "../categorySlider/categorySlider";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import MainSlider from "../mainSlider/mainSlider";
import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../../context/wishListContext";


function getProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then(({ data }) => data);
}

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProducts,
    refetchInterval: 5000,
    staleTime: 4000
  });

  const { addProductToCart } = useContext(CartContext); 
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    if (response?.data?.status === 'success') {
      toast.success(response.data.message, { duration: 4000, position: 'top-left' });
    } else {
      toast.error(response?.data?.message || "Error occurred", { duration: 4000, position: 'top-left' });
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4">
      <MainSlider />
      <CategorySlider />
      <h1 className="text-3xl font-medium">All Products</h1>
      <div className="container py-5">
        <div className="row gap-1">
          {data?.data.map((productInfo) => {
            const isWished = wishlist.some((item) => item.id === productInfo.id);

            return (
              <div className="w-2/12 px-4 my-2 product" key={productInfo.id}>
                <div className="bg-slate-200 p-5 relative rounded-lg">
                  <button
                    onClick={() => {
                      toggleWishlist(productInfo);
                     toast.success(isWished ? "Removed from wishlist" : "Added to wishlist");

                    }}
                    className="absolute top-2 left-2 z-10"
                  >
                    <FaHeart color={isWished ? "red" : "lightgray"} size={20} />
                  </button>

                  <Link to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}>
                    <img className="w-full" src={productInfo.imageCover} alt={productInfo.title} />
                    <span className="block text-sm font-semibold text-blue-600">
                      {productInfo.category.name}
                    </span>
                    <span className="text-l font-semibold text-gray-700">
                      {productInfo.title.split(' ').slice(0, 3).join(' ')}
                    </span>
                    <div className="flex justify-between my-3">
                      <span>{productInfo.price}EGP</span>
                      <span>
                        {productInfo.ratingsQuantity}
                        <i className="fas fa-star text-yellow-500"></i>
                      </span>
                    </div>
                  </Link>

                  <button onClick={() => addProductItem(productInfo.id)} className="btn">
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



