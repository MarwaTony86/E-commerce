import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Products from './component/Products/Products';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Brands from './component/Brands/Brands';
import Carts from './component/Carts/Carts';
import NotFound from './component/NotFound/NotFound';
import Layout from './component/Layout/Layout';
import UserContextProvider from './context/userContext';
import ProtectedRoute from './component/protectedRoute/protectedRoute';
import Productdetails from './component/productdetails/productdetails';
import  CartContextProvider  from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Checkout from './component/checkout/checkout';
import Allorders from './component/allorders/allorders';
import { Offline ,Online } from "react-detect-offline";
import ForgotPassword from './component/forgotPassword/forgotPassword';
import ResetPassword from './component/resetPassword/resetPassword';
import BrandDetails from './component/brandDetails/brandDetails';
import WishList from './component/wishList/wishList'


let query =new QueryClient()

let routes=createBrowserRouter([
  {
    path: '', element: <Layout />,
    children: [
    {index: true , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'login', element:<Login/>},
    {path:'Register', element:<Register/>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'wishList', element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'checkout/:cartId', element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders', element:<ProtectedRoute><Allorders/></ProtectedRoute>},
     {path:'productDetails/:id/:category',element:<ProtectedRoute><Productdetails/></ProtectedRoute>},
     {path:'brandDetails/:slug',element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
    { path: 'carts', element: <ProtectedRoute><Carts /></ProtectedRoute> },
    { path: 'forgotPassword', element: <ForgotPassword/> },
    { path: 'resetPassword', element: <ResetPassword/> },
    {path:'*', element:<NotFound/>},
  ]}
])
function App() {
 
  return (
    <CartContextProvider>
<UserContextProvider>
        <QueryClientProvider client={query}>
          <ReactQueryDevtools></ReactQueryDevtools>
          <RouterProvider router={routes} ></RouterProvider>
          <Offline>
            <div className='bg-yellow-200 fixed bottom-4 start-4 rounded-md'>
              Only shown offline (surprise!)
            </div>
          </Offline>
          <Toaster />
          </QueryClientProvider>
     </UserContextProvider>
    </CartContextProvider>
    
  )
} 

export default App
