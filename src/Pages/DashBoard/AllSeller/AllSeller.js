import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const AllSeller = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  const {
    data: alluser = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://server-bike.vercel.app/users");
      const data = await res.json();
      console.log(data);
      return data.data;
    },
  });
  // data submit
  const handlesubmit = (id) => {
    fetch(`https://server-bike.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("moto-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message, { autoClose: 500 });
          refetch();
        }
      });
  };
  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  const closeModal = () => {
    setDeletingUser(null);
  };
  // delete function
  const handleDeleteUser = (user) => {
    fetch(`https://server-bike.vercel.app/users/${user._id}`, {
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
          toast.success(`User deleted successfully`, { autoClose: 500 });
        }
      });
  };
  return (
    <div className="mt-5">
      <h3 className="text-3xl mb-5">All Seller</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verification</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {alluser?.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {
                    <button
                      onClick={() => handlesubmit(user._id)}
                      className={
                        user?.role === "VERIFIED"
                          ? "flex items-center justify-center w-1/2 p-1 font-semibold tracking-wide rounded-md bg-sky-600 hover:bg-sky-700 text-gray-100"
                          : "flex items-center justify-center w-1/2 p-1 font-semibold tracking-wide rounded-md bg-gray-800 hover:bg-gray-700 text-gray-100"
                      }
                    >
                      {user?.role === "VERIFIED" ? "VERIFIED" : "NOT VERIFIED"}
                    </button>
                  }
                </td>
                <td>
                  <label
                    onClick={() => setDeletingUser(user)}
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
      {deletingUser && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingUser.name}. It cannot be undone.`}
          successAction={handleDeleteUser}
          successButtonName="Delete"
          modalData={deletingUser}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSeller;
