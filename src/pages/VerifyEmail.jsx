import React from 'react'
import { useSelector } from 'react-redux'

const VerifyEmail = () => {
    const {loading} = useSelector((state) => state.auth);
  return (
    <div>
      {
        loading
        ? (
            <div className='spinner'>

            </div>
        ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          {/* <form ></form> */}

            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
