import React from 'react'
import { useSelector } from 'react-redux'

const UpdatePsssword = () => {
    const {loading} = useSelector((state) => state.auth);
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
        loading ? (
            <div className="spinner"></div>
        ) : (
            <div className="max-w-[500px] p-4 lg:p-8" >
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Chose new Password</h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"> Almost done. Enter your new password and youre all set.</p>
            </div> 
        )
      }
    </div>
  )
}

export default UpdatePsssword
