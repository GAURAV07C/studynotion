import React from 'react'
import { useSelector } from 'react-redux'

const EntrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);


  return (
    <div>EntrolledCourses</div>
  )
}

export default EntrolledCourses
