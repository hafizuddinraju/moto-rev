import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import logo2 from '../../logo2.png'
import {FaUserAlt } from 'react-icons/fa';
import './Navbar.css'
import * as Scroll from 'react-scroll';
import { Link as LinkScroll } from 'react-scroll'
import { AuthDataContext } from '../../AuthContext/AuthContext';

const Navbar = () => {
  const {LogOut, user} = useContext(AuthDataContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLogout = ()=>{
      localStorage.removeItem('moto-token')
      LogOut()
    }
    const menuItem = 
    <>
     <li>
              <Link
                to="/home"
                aria-label="Home"
                title="Home"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link
                to="/blog"
                aria-label="Blog"
                title="Blog"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Blog
              </Link>
            </li>
            
            <li>
              <LinkScroll  to="about"
                  spy={true}
                  smooth={true}
                  duration={800}
              
                aria-label="About us"
                title="About us"
                className="font-medium cursor-pointer tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                About us
             
              </LinkScroll>
            </li>
            <li>
              <LinkScroll  to="contact"
                  spy={true}
                  smooth={true}
                  duration={800}
              
                aria-label="Contact"
                title="Contact"
                className="font-medium cursor-pointer tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
               Contact
             
              </LinkScroll>
            </li>
            {
              user && user.uid?
              <>
              <li>
              <Link  to="/dashboard"
                 
              
                aria-label="DashBoard"
                title="DashBoard"
                className="font-medium cursor-pointer tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
               DashBoard
             
              </Link>
            </li>
              <li onClick={handleLogout} >
            <Link
                to="/"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                aria-label="Logout"
                title="Logout"
            >
                Logout
            </Link>
            </li>
            <li>
                <Link to= '/' className='tooltip tooltip-bottom' data-tip={user?.displayName}>
                  {
                    user && user?
                    <img className='profile-img ' src={user?.photoURL} alt=''/>
                    :
                    <FaUserAlt></FaUserAlt>


                  }
                    
                    
                
                </Link>
                
            </li>
            </>
            :
            ''

            }
            
    </>
  
    return (
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
        <label htmlFor="my-drawer-2" className='lg:hidden'>
              <svg  className="w-5 text-gray-900" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>

              </label>
          <Link
            to="/"
            aria-label="B-Expo"
            title="B-Expo"
            className="inline-flex items-center"
          >
            <div>
                <img src={logo2} className='w-14' alt="" />
            </div>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
           <span className='text-red-500'>MOTO</span> REV
            </span>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
           {menuItem}
            
          </ul>
          <div className="lg:hidden z-10">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="B-Expo"
                        title="B-Expo"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        <span className='text-red-500'>MOTO</span> REV
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4 text-center">
                      {menuItem}
                      
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Navbar;