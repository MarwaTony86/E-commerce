
import axios from 'axios'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

export default function Checkout() {
  let {cartId }= useParams()
  function handleRegister(formsData) {
    console.log(formsData)
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      { 'shippingAddress': formsData },
      {
        headers: {
          token: localStorage.getItem('userToken')
        },
        params: {
          url: 'http://localhost:5173/'
        }
      }
    )
      .then((response) => {
        console.log('checkout', response)
        location.href = response.data.session.url
               
      })
      .catch((error) => {
        console.log(error);
         
      })
    
  }

    let formik = useFormik({
      initialValues: {
        details: '',
        phone: '',
        city: '',
      },
      onSubmit: handleRegister
    })
    return (
      <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-sky-500">
                        Pay Now       
              </h2>
 
              <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                <div>
                  <label htmlFor="urdetails" className="block text-sm font-medium text-gray-700">Details</label>
                  <div className="mt-1">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" id="urdetails" value={formik.values.details} type="text" autoComplete="details"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                   
                               
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
                  <div className="mt-1">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" value={formik.values.phone} type="tel" autoComplete="phone"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
        
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">city</label>
                  <div className="mt-1">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" id="city" value={formik.values.city} type="text" autoComplete="city"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
        
                  </div>
                </div>
                <div>
                  <button type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                   pay now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
     
      </>
  
    )
      
  }
