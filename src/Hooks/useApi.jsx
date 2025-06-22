import axios from "axios";
import { useEffect, useState } from "react";

export function useApi() {
const [dataList, setData]=useState([])

    
    async function getData() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setData(data?.data)

    }
   



    useEffect(() => {
    getData()
}, [])

    return { dataList } 
} 


