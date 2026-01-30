import { useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const AdminWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      const res = await fetch("/api/v1/admin/wallets", {
        credentials: "include",
      });
      const data = await res.json();
      setWallets(data.wallets || []);
      setLoading(false);
    };
    fetchWallets();
  }, []);

  return (
    <>
      <MetaData title="Admin : Wallet History" />
      {loading && <BackdropLoader />}

      <div className="max-w-6xl mx-auto">
        <div className="bg-white border rounded-md shadow-sm">

          {/* HEADER (same style as Add Product) */}
          <div className="px-6 py-3 border-b">
            <h1 className="text-lg font-semibold text-red-700">
              Wallet History
            </h1>
          </div>

          {/* BODY */}
          <div className="p-4 sm:p-6 space-y-4">
            {wallets.map((w) => (
              <div
                key={w._id}
                className="border rounded-md bg-gray-50"
              >
                {/* SUMMARY ROW */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenId(openId === w._id ? null : w._id)
                  }
                  className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 text-left"
                >
                  {/* USER */}
                  <div>
                    <p className="font-medium text-gray-800">
                      {w.user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {w.user?.email}
                    </p>
                  </div>

                  {/* BALANCE */}
                  <div className="flex sm:flex-col sm:text-right justify-between">
                    <p className="font-semibold text-green-600">
                      ₹{w.balance}
                    </p>
                    <p className="text-xs text-gray-500">
                      {w.transactions.length} transactions
                    </p>
                  </div>
                </button>

                {/* TRANSACTIONS */}
                {openId === w._id && (
                  <div className="border-t bg-white overflow-x-auto">
                    <table className="min-w-[600px] w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border">Amount</th>
                          <th className="p-2 border">Type</th>
                          <th className="p-2 border">Description</th>
                          <th className="p-2 border">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {w.transactions.map((t, i) => (
                          <tr key={i} className="text-center">
                            <td className="p-2 border">₹{t.amount}</td>
                            <td
                              className={`p-2 border font-medium ${
                                t.type === "credit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {t.type}
                            </td>
                            <td className="p-2 border">
                              {t.description}
                            </td>
                            <td className="p-2 border">
                              {new Date(t.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {wallets.length === 0 && !loading && (
              <p className="text-center text-gray-500 text-sm">
                No wallet data found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWallets;
