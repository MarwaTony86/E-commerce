import  { useContext, useEffect } from 'react'
import img from '../../assets/img/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext';
import { CartContext } from '../../context/cartContext';
import { WishListContext } from './../../context/wishListContext';

  
  
  
export default function Navbar() {
let navigate= useNavigate()
  let { isLogin, setLogin } = useContext(userContext)
  let { cartNumber, getProductToCart } = useContext(CartContext)
  const  Wishlist  = useContext(WishListContext); 

  function logOut() {
    localStorage.removeItem('userToken'); 
    setLogin(null);
    navigate('/login')
 }
  async function getProduct() {
   await getProductToCart()
 }
  
  useEffect(() => {
    getProduct()
  })
  return (
    <>
      <nav className='bg-slate-300 shadow-sm p-4'>
        <div className='flex  justify-between lg:items-center  flex-col lg:flex-row'>
           <div className='logo flex flex-col lg:flex-row'>
            <img src={img} width={110} alt="fresh-cart-logo" />

            {isLogin ?
             <ul className='flex flex-col lg:flex-row'>
            <li className='px-3 py-2'><NavLink to={''}>Home</NavLink></li>
                <li className='px-3 py-2'><NavLink to={'brands'}>Brands</NavLink></li>
                <li className='px-3 py-2 relative'><NavLink to={'wishList'}>Wishlist</NavLink></li>
                <li className='px-3 py-2 relative'>
  <NavLink to='carts'>Cart</NavLink>

  {cartNumber > 0 && (
    <span className="bg-gray-100 absolute top-0 left-11 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
      {cartNumber}
    </span>
  )}
</li>

              </ul>: null
            }
            </div>

          <div className='social'>
            <ul className='flex flex-col lg:flex-row lg-items-center '>
              {!isLogin ?
                <>
                <li className='px-2'> <NavLink to={'Register'}>Register</NavLink></li>
              <li className='px-2'> <NavLink to={'Login'}>Login</NavLink></li>
                 <li className='px-2'>
              <i className='fab px-2 fa-facebook '></i>
              <i className='fab px-2 fa-youtube '></i>
              <i className='fab px-2 fa-instagram '></i>
            </li>
                            </>:
                <li className='px-2 cursor-pointer'> <span onClick={() => { logOut() }}>LogOut</span></li>
           }
                         

            </ul>
           

          </div>

       </div>
    </nav>
    
    
    
    
    </>
  )
}
