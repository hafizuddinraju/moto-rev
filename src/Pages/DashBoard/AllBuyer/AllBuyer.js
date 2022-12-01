import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import MediumSpinner from "../../../components/Spinner/MediumSpinner";

const AllBuyer = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  //get Data
  const {
    data: alluser = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://server-bike.vercel.app/allbuyer");
      const data = await res.json();
      console.log(data);
      return data.data;
    },
  });

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
      <h3 className="text-3xl mb-5">All Buyer</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
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

export default AllBuyer;
