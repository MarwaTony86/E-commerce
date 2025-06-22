import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader/loader";

export default function BrandDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();

  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => data);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['singleBrand'],
    queryFn: getAllBrands,
  });

  if (isLoading) return <Loader />;

  const brand = data?.data.find((b) => b.slug.toLowerCase() === slug.toLowerCase());

  if (!brand) {
    return <h2 className="text-slate-600 p-4 text-xl font-bold">Brand not found</h2>;
  }

  return (
    <div className="flex flex-col items-center p-10">
  <h1 className="text-3xl font-bold mb-6">{brand.name}</h1>

  
  <div className="relative w-72 h-72 bg-white rounded-xl shadow-lg overflow-hidden">

  
    <img
      src={brand.image}
      alt={brand.name}
      className="w-full h-full object-contain"
    />
 <div className="absolute bottom-12 left-0 w-full h-px bg-gray-300"></div>
   
    <button
      onClick={() => navigate(-1)}
      className="absolute bottom-2 right-2 bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
    >
      Close
    </button>
  </div>
</div>

  );
}
