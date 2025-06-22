import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"


export default function ResetPassword() {
 let navigate=useNavigate()
  async function RestPassword(values) {
        let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
    console.log(data)
    if (data.token) {
      navigate('/login')
    }
  }
  let formik = useFormik({
    initialValues:{
    email: '',
      newPassword:''
  },
    onSubmit:RestPassword
})
  
  return (
    <div>
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        <label className="mx-20 my-5 text-sm">email:</label>
        <input id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type='email' className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg  block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input:focus" placeholder="name@flowbite.com" required/>
        <label className="mx-20 my-5 text-sm">newPassword:</label>
        <input id='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type='newPassword' className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg  block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input:focus" required/>
        <button type='submit' className="btn bg-slate-700 text-light mx-20 my-3 cursor-pointer">Reset Password</button>

</form>

    </div>
  )
}
