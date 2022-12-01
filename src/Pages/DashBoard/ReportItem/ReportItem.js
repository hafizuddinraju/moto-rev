import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../../AuthContext/AuthContext";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const ReportItem = () => {
  const { user } = useContext(AuthDataContext);
  const [deletingProducts, setDeletingProducts] = useState(null);
  //get data
  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://server-bike.vercel.app/report`, {
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
  //delete report
  const handleDeleteReport = (Products) => {
    console.log(Products);
    fetch(`https://server-bike.vercel.app/report/${Products._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.data.deletedCount > 0) {
          refetch();
        }
      });
    fetch(`https://server-bike.vercel.app/products/${Products._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.data.deletedCount > 0) {
          toast.success(`Products deleted successfully`, { autoClose: 500 });
        }
      });
  };

  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  return (
    <div className="py-5">
      <h2 className="text-3xl font-bold py-2">All Report Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report, i) => (
              <tr key={report._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={report.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{report.product_Name}</td>

                <td>
                  <label
                    onClick={() => setDeletingProducts(report)}
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
          successAction={handleDeleteReport}
          successButtonName="Delete"
          modalData={deletingProducts}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ReportItem;
