import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../../AuthContext/AuthContext";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const MyOrders = () => {
  const { user } = useContext(AuthDataContext);
  const [deletingProducts, setDeletingProducts] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://server-bike.vercel.app/orders/${user?.email}`,
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
  //delete products
  const handleDeleteProducts = (Products) => {
    console.log(Products);
    fetch(`https://server-bike.vercel.app/orders/${Products._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data.deletedCount > 0) {
          refetch();
          toast.success(`Products deleted successfully`, { autoClose: 500 });
        }
      });
  };
  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  return (
    <div className="py-5">
      <h2 className="text-3xl font-bold py-2">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Resale Price</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={product.photo} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.product_Name}</td>
                <td>{product.email}</td>
                <td>{product.resalePrice}</td>

                <td>
                  {product.resalePrice && !product.paid && (
                    <Link to={`/dashboard/myorders/payment/${product._id}`}>
                      <button className="btn bg-sky-500 border-none btn-sm">
                        Pay
                      </button>
                    </Link>
                  )}
                  {product.resalePrice && product.paid && (
                    <button className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md bg-sky-600 hover:bg-sky-700 text-gray-100 ">
                      Paid
                    </button>
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

export default MyOrders;
