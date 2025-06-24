 import axios from "axios"
import { useContext, useEffect, useState } from "react"
 import { useParams } from "react-router-dom"
import Category from '../category/category';
import toast from "react-hot-toast";
import  Slider  from 'react-slick';
import { CartContext } from "../../context/cartContext";



export default function Productdetails() {
   
  let { addProductToCart } = useContext(CartContext)
  

   let { id } = useParams()
  const [details, setDetails] = useState(null)  
  


  async function addProductItem(id) {
      let response = await addProductToCart(id)
      if (response.data.status == 'success') {
      toast.success(response.data.message, {
        duration: 4000,
        position: 'button-right',
      });
    } else {
      toast.error(response.data.message, {
        duration: 4000,
        position: 'button-right',
      });
    }
  }
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
   function getProductDetails() {
     axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setDetails(data.data)
      })
       .catch()
   } 

   useEffect(() => {
  getProductDetails()
   }, [id])
   

   return (
     <>
       
     <div className='row justify-center items-center my-5'>
         <div className='w-1/4'>
           <Slider {...settings}>
             {details?.images.map((src) => {
     return <img src={src} alt={details?.title}/>
      })}
    </Slider>
      </div>
    <div className='w-3/4 flex flex-col justify-around h-80'>
      <div>
         <h1 className='text-xl font-semibold text-slate-800'>{details?.title}</h1>
      <p>{details?.description}</p> 
      </div>
      <div>
        <p className="mt-3">{details?.category?.name}</p>
       <div className="flex justify-between my-3">
                <span>{details?.price}EGP</span>
                <span>{details?.ratingsQuantity}<i className="fas fa-star text-yellow-500"></i></span>
      </div>
      <button onClick={()=>{addProductItem(details?.id)}} className="btn">Add To Cart</button>
      </div>
        </div>
       </div>
       <Category categoryName={details?.category?.name}/>
     </>
     
    )
    }
