import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { ACCOUNT_TYPE } from "../../utils/constants"


const NavNar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true)
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategories)
    } catch (err) {
      console.log("could not fetch category list")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubLinks();

  }, [])

  const matchRoutes = ((route) => {
    return matchPath({ path: route }, location.pathname)
  })

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={42} loading='lazy' />
        </Link>
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.title === "Catalog" ? (
                      <div className='relative flex items-center gap-2 group'>
                        <p>{link.title}</p>
                        <BsChevronDown />

                        <div className=' invisible absolute left-[50%] top-[50%]
                         translate-x-[-50%] translate-y-[10%]
                        flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10'>

                          <div className='absolute left-[50%] top-0  translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                          </div>
                          {


                            subLinks.length ? (
                              subLinks.map((subLink, index) => (
                                
                                <Link
                                  to={`/catalog/${subLink.title


                                    }`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 text-black"
                                  key={index}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )
                            
                          }
                        </div>

                      </div>
                    ) : (
                      <Link to={link?.path}>

                        <p className={`${matchRoutes(link?.path) ? "text-yellow-25" : "text-richblack-5"}`} >{link.title}  </p>
                      </Link>
                    )
                  }
                </li>
              ))
            }

          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden ">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default NavNar
