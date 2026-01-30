import { Link } from "react-router-dom";

const essentials = [
  { name: "Power Banks", icon: "fa-battery-full", slug: "power-bank" },
  { name: "Fast Chargers", icon: "fa-bolt", slug: "charger" },
  { name: "Data Cables", icon: "fa-ethernet", slug: "data-cable" },
  { name: "Neckbands", icon: "fa-headphones", slug: "neckband" },
  { name: "Bluetooth Speakers", icon: "fa-volume-high", slug: "speaker" },
  { name: "OTG & Connectors", icon: "fa-usb", slug: "otg" },
];

const EssentialProducts = () => {
  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .essential-card {
          border: 1px solid #eee;
          border-radius: 6px;
          padding: 18px 10px;
          text-align: center;
          background: #fff;
          transition: all 0.2s ease;
        }

        .essential-card:hover {
          border-color: #d32f2f;
          transform: translateY(-2px);
        }

        .essential-icon {
          font-size: 32px;
          color: #d32f2f;
          margin-bottom: 8px;
        }

        .essential-title {
          font-size: 13px;
          font-weight: 600;
          color: #222;
        }
      `}</style>

      <div className="container my-4">
        <h5 className="fw-bold mb-3">Essential Products</h5>

        <div className="row g-3">
          {essentials.map((item, i) => (
            <div className="col-6 col-md-4 col-lg-2" key={i}>
              <Link
                to={`/products?category=${item.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="essential-card">
                  <div className="essential-icon">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="essential-title">{item.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EssentialProducts;
