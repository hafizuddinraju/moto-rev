import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const Ads = () => {
  const {
    data: ads,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://server-bike.vercel.app/ads`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("moto-token")}`,
          },
        });
        const data = await res.json();
        return data.data;
      } catch (error) {
        toast.error(error.message, { autoClose: 500 });
      }
    },
  });
  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  return (
    <div>
      {ads?.slice(0, 1)?.map((ad) => {
        return (
          <div key={ad._id} className="p-6 py-12 bg-red-400 text-gray-900">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <img className="w-32 rounded-lg" src={ad?.image} alt="" />
                </div>
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <h1 className="text-2xl font-bold">{ad?.product_Name}</h1>
                </div>
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <h1 className="text-2xl font-bold">
                    {" "}
                    Price: {ad?.resalePrice}
                  </h1>
                </div>
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <h1 className="text-2xl font-bold"> {ad?.category}</h1>
                </div>
                <Link
                  to={`/viewProduct/${ad?.product_id}`}
                  rel="noreferrer noopener"
                  className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-gray-900 border-gray-400"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ads;
