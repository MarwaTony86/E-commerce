import { useApi } from './../../Hooks/useApi';
import { Link } from "react-router-dom";

export default function Brands() {
  let { dataList } = useApi();
  
  return (
    <div className="px-4">
      <h1 className="text-3xl font-medium mb-4">All Brands</h1>
      <div className="container py-5">
        <div className="row gap-1">
          {dataList.map((brand) => (
            <div className="w-2/12 px-4 my-2" key={brand._id}>
              <div className="bg-slate-200 p-5 text-center">
                <Link to={`/brandDetails/${brand.slug}`}>
                  <img
                    className="w-full h-40 object-contain"
                    src={brand.image}
                    alt={brand.name}
                  />
                  <h2 className="mt-3 text-lg font-semibold text-gray-700">
                    {brand.name}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
