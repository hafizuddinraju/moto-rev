import React from 'react';
import {Link} from 'react-router-dom'
import a11 from '../../../assets/image/a11.jpg'
import a22 from '../../../assets/image/a22.jpg'
import a33 from '../../../assets/image/a33.jpg'
import * as Scroll from 'react-scroll';
import { Link  as LinkScroll } from 'react-scroll'

const About = () => {
    return (
      <div id='about' className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center md:pr-8 xl:pr-0 ">
            <div className=" w-20  h-16 mb-4 font-semibold rounded-full  text-red-600">
              <h1 >About Us</h1>
            </div>
            <div className="md:text-start text-center mb-6">
              <h2 className="md:max-w-lg text mb-6 font-sans text-1xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Dramatically supply parallel  
                <br className="hidden md:block" />
                collaboration and idea-sharing {' '}
                <span className="inline-block text-deep-purple-accent-400">
                 via cross-platform
                </span>
              </h2>
              <p className="text-base text-justify text-gray-700 md:text-lg">
              Interactively synthesize tactical supply chains whereas adaptive markets. Appropriately morph leading-edge processes via granular communities. Continually benchmark tactical initiatives before user-centric e-commerce. Efficiently pontificate future-proof ROI with.
              </p>
            </div>
            <div className='md:text-start text-center'>
                <LinkScroll
                   to="categories"
                   spy={true}
                   smooth={true}
                   duration={800}
                  className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md hover:text-white bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                >
                  Let's Go
                </LinkScroll>
              </div>
          </div>
          <div className="flex items-center justify-center -mx-4 lg:pl-8">
            <div className="flex flex-col items-end px-3">
              <img
                className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                src={a11}
                alt=""
              />
              <img
                className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                src={a33}
                alt=""
              />
            </div>
            <div className="px-3">
              <img
                className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                src={a22}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default About;