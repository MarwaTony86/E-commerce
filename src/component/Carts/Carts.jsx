import { useContext, useEffect, useState } from 'react'
// import { cartContext } from './../../context/cartContext';

import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';

export default function Carts() {

  const [product,setProduct]= useState(null)
  let {getProductToCart , updateProductInCart, deleteProductInCart }=useContext(CartContext)

  async function getProduct() {
    let {data} = await getProductToCart()
    console.log(data.data);
    setProduct(data?.data)
}
  async function updateProduct(id,countNumber) {
    let {data} = await updateProductInCart(id,countNumber)
    console.log(data.data);
    setProduct(data?.data)
  }
  
  async function deleteProduct(id) {
    let { data } = await deleteProductInCart(id);
    console.log(data.data)
    setProduct(data?.data)


  }

  useEffect(()=> {
  getProduct()

},[])
  return (
    <div className='flex flex-wrap justify-around'>
       <div className='my-12 w-8/12'>
      {product?.products?.length > 0 ?
        <>
      
 <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-10/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-5">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
          <tbody>

           
                {product?.products?.map((item) => {
                  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item?.product?.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => { updateProduct(item?.product?.id, item.count - 1) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item?.count} required />
                        </div>
                        <button onClick={() => { updateProduct(item?.product?.id, item.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item?.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <a onClick={() => { deleteProduct(item?.product?.id) }} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                    </td>
                  </tr>
                })
                }
          </tbody>
  </table>
</div>
        </>
     
        : 
        <h1 className='font-semibold text-3xl text-slate-500 text-center '>There is No Data</h1>
      }
  

      </div> 
      <div className='w-3/12'>
      <div class="w-full my-8 py-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
       <div class="px-5 pb-5">
       <h1 className='text-center text-3xl text-main'>Shopping Cart</h1>
      <p className='text-xl text-center text-slate-500 py-3'>Total Price  :<span className='font-medium'>{product?.totalCartPrice}</span> EGP </p>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <Link to={'/checkout/'+product?._id} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CheckOut</Link>
        </div>
    </div>
</div>

      
      </div>
    </div>
   
  )
}
