import { useEffect } from "react";
import { Doughnut, Line, Pie, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { categories } from "../../utils/category";
import MetaData from "../Layouts/MetaData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const MainData = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.products);
  const { orders = [] } = useSelector((state) => state.allOrders);
  const { users = [] } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  /* ================= TOTALS ================= */
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  /* ================= MONTHS ================= */
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const date = new Date();

  const salesData = (year) =>
    months.map((_, i) =>
      orders
        .filter(
          (o) =>
            new Date(o.createdAt).getMonth() === i &&
            new Date(o.createdAt).getFullYear() === year
        )
        .reduce((sum, o) => sum + (o.totalPrice || 0), 0)
    );

  const finalSalesData = salesData(date.getFullYear());

  const maxValue =
    finalSalesData.length > 0 ? Math.max(...finalSalesData) : 0;

  const yStep =
    maxValue <= 40 ? 10 :
    maxValue <= 70 ? 20 :
    25;

  const yMax = maxValue > 0 ? Math.ceil(maxValue / yStep) * yStep : 10;

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: yMax,
        ticks: { stepSize: yStep },
      },
      x: { grid: { display: false } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12 },
      },
    },
  };

  return (
    <>
      <MetaData title="Admin Dashboard | Radnus" />

      {/* ================= STAT CARDS ================= */}
      <div className="row g-3 mb-4">
        <StatCard title="Total Revenue" value={`₹ ${totalRevenue}`} color1="#6a5af9" color2="#4c1d95" />
        <StatCard title="Orders" value={totalOrders} color1="#0ea5e9" color2="#075985" />
        <StatCard title="Products" value={totalProducts} color1="#22c55e" color2="#14532d" />
        <StatCard title="Users" value={totalUsers} color1="#ec4899" color2="#831843" />
      </div>

      {/* ================= SALES OVERVIEW ================= */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h6 className="fw-bold mb-2">Sales Overview</h6>

          <div style={{ height: "220px" }}>
            <Line
              data={{
                labels: months,
                datasets: [
                  {
                    data: finalSalesData,
                    borderColor: "#6366f1",
                    backgroundColor: "rgba(99,102,241,0.2)",
                    fill: true,
                    tension: 0.35,
                    borderWidth: 2,
                  },
                ],
              }}
              options={lineOptions}
            />
          </div>
        </div>
      </div>

      {/* ================= ORDER + STOCK ================= */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Order Status</h6>
              <div style={{ height: "200px" }}>
                <Pie
                  data={{
                    labels: ["Processing", "Shipped", "Delivered"],
                    datasets: [{
                      data: [
                        orders.filter(o => o.orderStatus === "Processing").length,
                        orders.filter(o => o.orderStatus === "Shipped").length,
                        orders.filter(o => o.orderStatus === "Delivered").length,
                      ],
                      backgroundColor: ["#fb923c", "#38bdf8", "#22c55e"],
                    }],
                  }}
                  options={pieOptions}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Stock Status</h6>

              <div className="mb-3">
                <small className="fw-semibold text-success">
                  In Stock ({totalProducts - outOfStock})
                </small>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${((totalProducts - outOfStock) / totalProducts) * 100}%` }}
                  />
                </div>
              </div>

              <small className="fw-semibold text-danger">
                Out of Stock ({outOfStock})
              </small>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${(outOfStock / totalProducts) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY BAR ================= */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h6 className="fw-bold mb-2">Products by Category</h6>
          <div style={{ height: "240px" }}>
            <Bar
              data={{
                labels: categories.filter(cat =>
                  products.some(p => p.category === cat)
                ),
                datasets: [{
                  data: categories
                    .filter(cat => products.some(p => p.category === cat))
                    .map(cat => products.filter(p => p.category === cat).length),
                  backgroundColor: "#6366f1",
                  barThickness: 28,
                }],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, color1, color2 }) => {
  const isMobile = window.innerWidth < 640;

  return (
    <div className="col-md-3 col-sm-6 col-12">
      <div
        style={{
          height: isMobile ? "90px" : "150px",
          padding: isMobile ? "10px" : "18px",
          borderRadius: "16px",
          color: "#fff",
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          boxShadow: isMobile
            ? "0 6px 12px rgba(0,0,0,0.15)"
            : "0 18px 35px rgba(0,0,0,0.25)",
        }}
      >
        <small style={{ fontSize: isMobile ? "11px" : "13px" }}>
          {title}
        </small>
        <h3
          style={{
            marginTop: "4px",
            fontWeight: 700,
            fontSize: isMobile ? "18px" : "24px",
          }}
        >
          {value}
        </h3>
      </div>
    </div>
  );
};

export default MainData;
