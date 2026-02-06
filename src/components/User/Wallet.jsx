import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";

const Wallet = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
  const fetchWallet = async () => {
    const res = await fetch("/api/v1/wallet/me", {
      credentials: "include",
    });
    const data = await res.json();

    if (data.success) {
      setBalance(data.balance);
    }
  };

  if (isAuthenticated) {
    fetchWallet();
  }
}, [isAuthenticated]);


  if (loading) return <Loader />;

const handleAddMoney = async () => {
  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  const res = await loadRazorpay();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // 1️⃣ Create order from backend
  const orderRes = await fetch("/api/v1/wallet/add-money", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ amount }),
});


  const orderData = await orderRes.json();

  // 2️⃣ Razorpay options
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: "INR",
    name: "RadnusOne Wallet",
    description: "Add money to wallet",
    order_id: orderData.orderId,

    handler: async function (response) {
      // 3️⃣ Verify & credit wallet
 const verifyRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/wallet/verify-payment`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature,
    amount,
  }),
});




      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setBalance(verifyData.balance);
        setAmount("");
        alert("Money added successfully 🎉");
      } else {
        alert("Payment verification failed");
      }
    },

    prefill: {
      name: user?.name,
      email: user?.email,
      contact: user?.phone || "",
    },

    theme: {
      color: "#dc2626",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <>
      <MetaData title="My Wallet | Radnus" />

      <main className="w-full mt-20 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row gap-6 items-start">

            {/* 🔹 SIDEBAR */}
            <div className="w-full sm:w-1/4 sm:sticky sm:top-24 self-start">

              {/* ✅ MOBILE PROFILE HEADER */}
              <div
                className="sm:hidden bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar?.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs text-gray-500">Hello,</p>
                    <p className="font-medium text-gray-800">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <span className="text-lg">{showMenu ? "▲" : "▼"}</span>
              </div>

              {/* ✅ MOBILE SIDEBAR MENU */}
              {showMenu && (
                <div className="mt-2 sm:hidden">
                  <Sidebar
                    activeTab="wallet"
                    showProfileCard={false}
                  />
                </div>
              )}

              {/* ✅ DESKTOP SIDEBAR */}
              <div className="hidden sm:block">
                <Sidebar activeTab="wallet" />
              </div>
            </div>

            {/* 🔹 CONTENT */}
            <div className="w-full sm:max-w-4xl bg-white rounded-lg shadow p-6">

              {/* HEADER */}
              <div className="mb-6">
                <h1 className="text-lg font-semibold text-gray-800">
                  My Wallet
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Wallet balance, transactions, refunds show.
                </p>
              </div>

              {/* BALANCE */}
              <div className="bg-gray-100 rounded p-4 mb-6">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  ₹{balance.toFixed(2)}
                </p>
              </div>

              {/* ADD MONEY */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border rounded px-3 py-2 w-full sm:w-40"
                />

                <button
                  onClick={handleAddMoney}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
                >
                  Add Money
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
