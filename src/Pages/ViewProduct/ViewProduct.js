import React, { useContext, useEffect, useState } from "react";
import { MdOutlineReport, MdVerified } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../AuthContext/AuthContext";
import Modal from "../../components/Modal/Modal";

const ViewProduct = () => {
  const { user } = useContext(AuthDataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState({});
  const [product, setproduct] = useState({});
  const [verified, setVerified] = useState({});
  useEffect(() => {
    fetch(`https://server-bike.vercel.app/viewProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setproduct(data?.data);
        if (data.success) {
          fetch(
            `https://server-bike.vercel.app/verifired/${product?.seller_email}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setVerified(data?.data);
              // console.log(data)
            });
        }
      });
  }, [id, product?.seller_email]);

  const {
    image,
    seller_Name,
    product_Name,
    location,
    resalePrice,
    originalPrice,
    year_of_use,
    phone,
    description,
    category,
    conditions,
    time_post,
    quantity,
  } = product;

  const handleReportSubmit = (product) => {
    console.log(product);
    fetch("https://server-bike.vercel.app/report", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message, { autoClose: 500 });
        }
      })
      .catch((error) => {
        toast.error(error.error, { autoClose: 500 });
      });
  };
  return (
    <div>
      <div className="p-5 mx-auto sm:p-10 md:p-16  text-gray-100">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <PhotoProvider>
            <PhotoView src={product?.image}>
              <img
                src={product?.image}
                alt=""
                className="w-full rounded-md h-60 sm:h-96 bg-gray-500"
              />
            </PhotoView>
          </PhotoProvider>
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
            <div className="space-y-2">
              <div
                rel="noopener noreferrer"
                className=" text-center text-2xl font-semibold sm:text-3xl"
              >
                {product_Name}
              </div>
              <div className="flex justify-between items-center">
                <div
                  rel="noopener noreferrer"
                  className="text-xs flex items-center  text-gray-400 font-semibold hover:underline"
                >
                  Seller: {seller_Name}{" "}
                  {verified?.role === "VERIFIED" ? (
                    <MdVerified
                      title="verified"
                      className="ml-1 text-sky-500"
                    ></MdVerified>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  rel="noopener noreferrer"
                  className="text-xs hover:underline"
                >
                  Condition: {conditions}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div
                  rel="noopener noreferrer"
                  className="text-xs text-gray-300  font-semibold hover:underline"
                >
                  Category: {category}
                </div>
                <div
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:underline"
                >
                  Location: {location}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div
                  rel="noopener noreferrer"
                  className="text-xl  text-orange-500 font-semibold hover:underline"
                >
                  Resale Price: {resalePrice}
                </div>
                <div
                  rel="noopener noreferrer"
                  className="text-xl text-red-500 font-semibold hover:underline"
                >
                  Original Price: {originalPrice}
                </div>
              </div>
            </div>
            <div className="text-gray-100 text-justify">{description}</div>
            <div className="flex justify-between items-center">
              <div
                rel="noopener noreferrer"
                className="text-xs  text-gray-400 font-semibold hover:underline"
              >
                Year of use: {year_of_use}
              </div>
              <MdOutlineReport
                onClick={() => handleReportSubmit(product)}
                title="report product"
                className="text-2xl text-red-600"
              ></MdOutlineReport>
              <div
                rel="noopener noreferrer"
                className="text-xs hover:underline"
              >
                Phone: {phone}
              </div>
            </div>
            <div className="text-center">
              {quantity === 0 ? (
                <label className="inline-flex disabled:opacity-75 items-center justify-center w-1/2 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-600 hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                  Stock out
                </label>
              ) : (
                <label
                  htmlFor={
                    user && user.uid ? "booking-modal" : navigate("/login")
                  }
                  className="inline-flex items-center justify-center w-1/2 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                  onClick={() => setModal(product)}
                >
                  Book Now
                </label>
              )}
            </div>
          </div>
        </div>
        {modal && (
          <Modal
            modal={modal}
            setModal={setModal}
            // refetch={refetch}
          ></Modal>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
