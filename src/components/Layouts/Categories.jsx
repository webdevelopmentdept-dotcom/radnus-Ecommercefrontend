import { Link, useLocation } from "react-router-dom";
import { catNav } from "../../utils/category";

const Categories = () => {
  const location = useLocation();
  const activeCategory =
    new URLSearchParams(location.search).get("category");

  return (
    <>
      <style>{`
        .efyer-categories {
        background: transparent;
border-bottom: none;

        }

        .efyer-scroll {
          display: flex;
          gap: 34px;
          overflow-x: auto;
          padding: 14px 0;
          scrollbar-width: none;
        }

        .efyer-scroll::-webkit-scrollbar {
          display: none;
        }

        .efyer-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 70px;
          text-decoration: none;
          color: #111;
          font-size: 13px;
        }

        .efyer-icon {
          font-size: 22px;
          color: #6b7280;
          margin-bottom: 6px;
          transition: 0.2s;
        }

        .efyer-text {
          font-size: 12px;
          white-space: nowrap;
        }

        .efyer-item:hover .efyer-icon,
        .efyer-item.active .efyer-icon {
          color: #f59e0b;
        }

        .efyer-item:hover .efyer-text,
        .efyer-item.active .efyer-text {
          color: #f59e0b;
          font-weight: 600;
        }
      `}</style>

      <section className="efyer-categories">
        <div className="max-w-7xl mx-auto px-4">
          <div className="efyer-scroll">
            {catNav.map((item, i) => {
              const isActive = activeCategory === item.name;

              return (
                <Link
                  key={i}
                  to={`/products?category=${encodeURIComponent(item.name)}`}
                  className={`efyer-item ${isActive ? "active" : ""}`}
                >
                  <i className={`fa-solid ${item.icon} efyer-icon`}></i>
                  <span className="efyer-text">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
