import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../../AuthContext/AuthContext";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const MyProduct = () => {
  const { user } = useContext(AuthDataContext);
  const [deletingProducts, setDeletingProducts] = useState(null);
  // get data
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://server-bike.vercel.app/products/${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("moto-token")}`,
            },
          }
        );
        const data = await res.json();
        return data.data;
      } catch (error) {
        toast.error(error.message, { autoClose: 500 });
      }
    },
  });

  const closeModal = () => {
    setDeletingProducts(null);
  };
  // delete product
  const handleDeleteProducts = (Products) => {
    fetch(`https://server-bike.vercel.app/products/${Products._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.deletedCount > 0) {
          refetch();
          toast.success(`Products deleted successfully`, { autoClose: 500 });
        }
      });
  };
  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  // ads function
  const handleAds = (product) => {
    console.log(product);
    const data = {
      seller_Name: product?.seller_Name,
      seller_email: product?.seller_email,
      product_Name: product?.product_Name,
      location: product?.location,
      resalePrice: product?.resalePrice,
      originalPrice: product?.originalPrice,
      year_of_use: product?.year_of_use,
      phone: product?.phone,
      category: product?.category,
      image: product?.image,
      quantity: 1,
      description: product?.description,
      product_id: product?._id,
    };
    fetch("https://server-bike.vercel.app/ads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
      body: JSON.stringify(data),
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
    <div className="py-5">
      <h2 className="text-3xl font-bold py-2">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Resale Price</th>
              <th>Ads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={product.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.product_Name}</td>
                <td>{product.seller_email}</td>
                <td>{product.resalePrice}</td>
                <td>
                  <label
                    onClick={() => handleAds(product)}
                    className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md bg-sky-600 hover:bg-sky-700 text-gray-100"
                  >
                    Ads Show
                  </label>
                </td>
                <td>
                  <label
                    onClick={() => setDeletingProducts(product)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingProducts && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingProducts.product_Name}. It cannot be undone.`}
          successAction={handleDeleteProducts}
          successButtonName="Delete"
          modalData={deletingProducts}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProduct;
