import promoLeft from "../../../assets/images/promoleftimage.webp";
import promoRight from "../../../assets/images/promorightimage.webp";

const PromoSection = () => {
  return (
    <>
      <style>{`
        .promo-wrapper {
          margin: 36px 0;
        }

        .promo-grid {
          display: grid;
          grid-template-columns: 2.2fr 1.2fr;
          gap: 28px;
        }

        .promo-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          min-height: 320px;
          padding: 40px;
          display: flex;
          align-items: center;
        }

        /* 🔥 OVERLAY (ONLY ADDITION) */
        .promo-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(85, 82, 82, 0.65),
            rgba(0, 0, 0, 0.25)
          );
          z-index: 1;
        }

        .promo-content {
          max-width: 50%;
          position: relative;
          z-index: 2; /* 🔥 IMPORTANT */
        }

        .promo-content small {
          font-size: 13px;
          color: #facc15; /* 🔥 TEXT COLOR */
          margin-bottom: 8px;
          display: block;
        }

        .promo-content h2 {
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #ffffff; /* 🔥 TEXT COLOR */
        }

        .promo-content p {
          font-size: 15px;
          margin-bottom: 20px;
          color: #e5e7eb; /* 🔥 TEXT COLOR */
        }

        .promo-btn {
          background: #dc2626;
          color: #fff;
          border: none;
          padding: 12px 26px;
          border-radius: 999px;
          font-weight: 600;
        }

        .promo-right .promo-content {
          max-width: 65%;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .promo-grid {
            grid-template-columns: 1fr;
          }

          .promo-card {
            min-height: 260px;
            padding: 20px;
            align-items: flex-end;
          }

          .promo-content {
            max-width: 100%;
          }

          .promo-content h2 {
            font-size: 22px;
          }
        }
      `}</style>

      <section className="promo-wrapper">
        <div className="promo-grid">

          {/* LEFT */}
          <div
            className="promo-card"
            style={{
              backgroundImage: `url(${promoLeft})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="promo-content">
              <small>Limited Stock</small>
              <h2>Best Deals on Accessories</h2>
              <p>Fast-moving wholesale products trusted by dealers.</p>
              <button className="promo-btn">Shop Now</button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="promo-card promo-right"
            style={{
              backgroundImage: `url(${promoRight})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="promo-content">
              <small>Dealer Exclusive</small>
              <h2>Up to 60% OFF</h2>
              <p>Special pricing and bulk discounts available.</p>
              <button className="promo-btn">View Deals</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PromoSection;
