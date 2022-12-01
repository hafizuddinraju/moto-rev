import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleCategory = () => {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`https://server-bike.vercel.app/category/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        console.log(data);
      });
  }, [name]);
  return (
    <div className="px-10 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => {
          return (
            <div key={category._id} aria-label="View Item">
              <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src={category?.image}
                  alt=""
                />
                <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                  <p className="text-2xl text-center font-medium tracking-wide text-white">
                    {category?.product_Name}
                  </p>
                  <p className="text-xs  font-medium tracking-wide text-white">
                    Post Time: {category?.time_post.slice(0, 10)}{" "}
                    {category?.time_post.slice(11, 19)}
                  </p>
                  <div className="flex justify-between items-center text-white">
                    <p>{category?.location}</p>
                    <p>{category?.conditions}</p>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <p className="text-orange-500 font-medium">
                      Resale Price: {category?.resalePrice}
                    </p>
                    <p className="text-red-600 font-medium">
                      Original Price: {category?.originalPrice}
                    </p>
                  </div>
                  <p className="text-sm mt-5 tracking-wide text-gray-300">
                    {category?.description.length > 50 ? (
                      <small>
                        {" "}
                        {category.description.slice(0, 50) + "..."}{" "}
                        <Link
                          className="text-sky-700"
                          to={`/viewProduct/${category._id}`}
                        >
                          Read More
                        </Link>
                      </small>
                    ) : (
                      category?.description
                    )}
                  </p>
                  <div className="text-center mt-3">
                    <Link to={`/viewProduct/${category._id}`}>
                      <button className="inline-flex items-center justify-center w-1/2 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleCategory;
