import React from 'react'
import NoFound from "./../../assets/img/error.svg"

export default function NotFound() {
  return (
    <div>
      <img src={ NoFound} className='w-1/2 mx-auto my-4'/>
    </div>
  )
}
