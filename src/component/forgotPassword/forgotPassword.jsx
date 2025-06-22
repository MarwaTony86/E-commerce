import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
const [step,setStep] = useState("email")
  let validationSchema = Yup.object({
      email:Yup.string().required('email is required').email('enter avalid email')
    })


   async function sendCode(values) {
    let {data}=await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
     console.log(data)
     if (data.statusMsg == 'success') {
       console.log('success');
       setStep('verify')

       
     }
  
}
  let formik =useFormik({
    initialValues: {
  email:''
    },
    validationSchema:validationSchema
    , 
    onSubmit:sendCode
  })
  let validationSchema2 = Yup.object({
      resetCode:Yup.string().required('verifyCode is required')
    })

let navigate=useNavigate() 
  async function sendData(values) {
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    console.log(data)
    if (data.status == 'Success') {
      navigate('/resetPassword')
    }
    //  if (data.statusMsg == 'success'){
       
    //  }
  
}
  let verfiyformik =useFormik({
    initialValues: {
  resetCode:''
    },
    validationSchema:validationSchema2
    ,
    onSubmit:sendData
  })
  return (
    <>
      <div className={step == "email" ? "block" : "hidden"}>
         <div className="forgotpassword">
      <h3 className="mx-20">Forgot Password:</h3>
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        <label className="mx-20 my-5 text-sm">email:</label>
        <input onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} id='email' name='email' className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg  block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input:focus" placeholder="name@flowbite.com" required/>
        {formik.touched.email && formik.errors.email ? <p className="text-red-600 mx-20">{ formik.errors.email}</p>:''}
        <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className="btn bg-slate-700 text-light mx-20 my-3">send Code</button>
          </form>
          </div>
      </div>
      <div className={step == "verify" ? "block" : "hidden"}>
         <div className="VerfiyCode">
      <h3 className="mx-20">VerfiyCode:</h3>
        <form className='w-75 mx-auto my-5' onSubmit={verfiyformik.handleSubmit}>
        <label className="mx-20 my-5 text-sm">resetCode:</label>
        <input onBlur={verfiyformik.handleBlur} type='text' value={verfiyformik.values.resetCode} onChange={verfiyformik.handleChange} id='resetCode' name='resetCode' className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg  block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input:focus" placeholder="name@flowbite.com"required />
        {verfiyformik.touched.resetCode && verfiyformik.errors.resetCode ? <p className="text-red-600 mx-20">{ verfiyformik.errors.resetCode}</p>:''}
        <button disabled={!(verfiyformik.isValid&&verfiyformik.dirty)} type='submit' className="btn bg-slate-700 text-light mx-20 my-3 cursor-pointer">send Code</button>
</form>
        </div>
        </div>
    </>
 
  )
}
 
