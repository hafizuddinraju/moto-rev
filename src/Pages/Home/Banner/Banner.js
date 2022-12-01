import React from 'react';
import {Link} from 'react-router-dom'
import * as Scroll from 'react-scroll';
import { Link as LinkScroll } from 'react-scroll'
import './Banner.css'
const Banner = () => {
    return (
      <div className="header">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
              <Link to="/" className="mb-6 sm:mx-auto">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-accent-400">
                  
                </div>
              </Link>
              <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="text-center md:max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                  <span className="relative text-center  inline-block">
                    
                    <span className="relative "> Monotonectally iterate </span>
                  </span >{' '}
                 emerging niche markets for B2B partnerships.
                </h2>
                <p className="text-base text-center text-indigo-100 md:text-lg">
                Progressively foster value-added deliverables whereas timely markets. Professionally reintermediate transparent data via.
                </p>
              </div>
              <div className='text-center'>
                <LinkScroll
                  to="categories"
                  spy={true}
                  smooth={true}
                  duration={800}
                  className="inline-flex cursor-pointer items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md hover:text-white bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                >
                  Get started
                </LinkScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Banner;