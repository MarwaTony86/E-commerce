import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  {WishlistProvider}  from "./context/wishListContext.jsx";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
 <App />
    </WishlistProvider>
     </StrictMode>,
)
