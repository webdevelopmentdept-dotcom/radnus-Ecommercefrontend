import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import MetaData from "../Layouts/MetaData";
import { submitSupportRequest } from "../../actions/supportAction";

const CustomerService = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, success, error } = useSelector(
    (state) => state.support
  );

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // ✅ NEW

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contactNumber || !message) {
      enqueueSnackbar("Please fill required fields", {
        variant: "warning",
      });
      return;
    }

    dispatch(
      submitSupportRequest({
        name,
        contactNumber,
        orderId,
        message,
      })
    );
  };

  useEffect(() => {
    if (success) {
      setSubmitted(true); // ✅ SHOW THANK YOU MESSAGE

      setName("");
      setContactNumber("");
      setOrderId("");
      setMessage("");

      dispatch({ type: "SUPPORT_RESET" });
    }

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [success, error, dispatch, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Customer Service | RadnusOne" />

    <div className="container pt-24 pb-12 md:pt-12">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">
            Customer Service
          </h1>
          <p className="text-gray-500">
            Need help with orders, products or support? We’re here for you.
          </p>
        </div>

        {/* SUPPORT CARDS */}
        <div className="row g-4 mb-12">
          <div className="col-md-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-100">
              <div className="text-4xl mb-3">📞</div>
              <h5 className="fw-bold mb-2">Call Support</h5>
              <p className="text-gray-500 mb-3">
                Talk directly with our support team
              </p>
              <span className="fw-semibold">+91 9940973030</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-100">
              <div className="text-4xl mb-3">💬</div>
              <h5 className="fw-bold mb-2">WhatsApp</h5>
              <p className="text-gray-500 mb-3">
                Fast response for dealers & retailers
              </p>
              <a
                href="https://wa.me/919940973030"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success rounded-pill px-4"
              >
                Chat Now
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-100">
              <div className="text-4xl mb-3">📧</div>
              <h5 className="fw-bold mb-2">Email Us</h5>
              <p className="text-gray-500 mb-3">
                For bulk orders & official queries
              </p>
              <span className="fw-semibold">
                sundar12134@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* FORM / THANK YOU */}
        <div className="row justify-content-center mb-12">
          <div className="col-lg-8">

            {submitted ? (
              /* ✅ THANK YOU MESSAGE */
              <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-3">
                  Thank you for your message!
                </h2>
                <p className="text-gray-600">
                  Our support team will contact you shortly to
                  resolve your query.
                </p>
              </div>
            ) : (
              /* 📝 FORM */
              <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
                <h3 className="text-center fw-bold mb-4">
                  Send us a message
                </h3>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control py-3"
                      placeholder="Contact Number"
                      maxLength="10"
                      value={contactNumber}
                      onChange={(e) =>
                        setContactNumber(e.target.value)
                      }
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Order ID (optional)"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control py-3"
                      rows="4"
                      placeholder="Describe your issue"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-pill px-5 py-3 fw-semibold"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

        {/* SUPPORT HOURS */}
        <div className="text-center text-gray-600">
          <h6 className="fw-bold mb-1">Support Hours</h6>
          <p className="mb-0">
            Monday – Saturday: 10:00 AM – 7:00 PM
          </p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
