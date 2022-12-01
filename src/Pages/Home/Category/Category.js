import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://server-bike.vercel.app/categories")
      .then(function (response) {
        setCategories(response.data.data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <MediumSpinner></MediumSpinner>;
  }

  return (
    <div
      id="categories"
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
    >
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-red-600  uppercase rounded-full bg-teal-accent-400">
            Brand Bike
          </p>
        </div>
        <h2 className="md:max-w-lg text-center mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-red-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Our</span>
          </span>{" "}
          Categories
        </h2>
        <p className="text-base text-justify md:text-center text-gray-700 md:text-lg">
          Dramatically incubate principle-centered outsourcing with front-end
          best practices. Competently morph cooperative web-readiness.
        </p>
      </div>
      <div className="grid gap-8 row-gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => {
          return (
            <div
              key={category._id}
              className=" rounded-md shadow-md bg-gray-900 text-gray-100"
            >
              <img
                src={category?.picture}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
              />
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl text-center font-semibold tracking-wide">
                    {category?.name}
                  </h2>
                  <p className="text-gray-100 text-justify">
                    {category?.description}
                  </p>
                </div>
                <Link to={`/category/${category?.name}`}>
                  <button className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-red-600 hover:bg-red-700 text-gray-100">
                    View Bike
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Category;
