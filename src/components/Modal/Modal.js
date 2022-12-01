import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../AuthContext/AuthContext";

const Modal = ({ setModal, modal }) => {
  const { user } = useContext(AuthDataContext);
  const navigate = useNavigate();

  //booking function
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const location = form.location.value;
    const phone = form.phone.value;

    const orders = {
      email: user?.email,
      resalePrice: modal?.resalePrice,
      product_id: modal?._id,
      product_Name: modal?.product_Name,
      photo: modal?.image,
      phone: phone,
      location,
    };

    fetch("https://server-bike.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setModal(null);
          toast.success(data.message, { autoClose: 500 });
          navigate("/dashboard");
        } else {
          toast.error(data.message, { autoClose: 500 });
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold"></h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              readOnly
              defaultValue={user?.email}
              className="input text-gray-800  w-full input-bordered "
            />

            <input
              name="name"
              defaultValue={user?.displayName}
              type="text"
              readOnly
              className="input w-full text-gray-800 input-bordered"
            />
            <input
              name="Product Name"
              type="text"
              defaultValue={modal?.product_Name}
              readOnly
              className="input w-full text-gray-800 input-bordered"
            />
            <input
              name="email"
              type="text"
              defaultValue={modal?.resalePrice}
              readOnly
              className="input w-full text-gray-800 input-bordered"
            />
            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              className="input text-gray-800 w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              placeholder="meeting Location"
              className="input text-gray-800 w-full input-bordered"
            />
            <br />

            <input
              className="btn bg-gray-900 w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
