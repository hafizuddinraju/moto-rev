import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const AllProducts = () => {
  const [deletingProducts, setDeletingProducts] = useState(null);

  const {
    data: allProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://server-bike.vercel.app/allProducts`, {
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
          fetch(`https://server-bike.vercel.app/ads/${Products._id}`, {
            method: "DELETE",
            headers: {
              authorization: `bearer ${localStorage.getItem("moto-token")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }
      });
  };
  if(isLoading){
    return <MediumSpinner></MediumSpinner>
  }
  return (
    <div className="py-5">
      <h2 className="text-3xl font-bold py-2">All Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Ads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((product, i) => (
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

                <td>
                  {product?.quantity === 0 ? (
                    <label className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md bg-gray-600 hover:bg-gray-700 text-gray-100">
                      Stock out
                    </label>
                  ) : (
                    <label className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md bg-sky-600 hover:bg-sky-700 text-gray-100">
                      In a Stock
                    </label>
                  )}
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

export default AllProducts;
