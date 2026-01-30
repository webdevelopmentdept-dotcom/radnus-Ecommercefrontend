const OfferCards = () => {
  return (
    <>
      <style>{`
        .offer-strip {
          padding: 34px 0;
          margin: 28px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }

        .offer-container {
          max-width: 1300px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .offer-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 0 24px;
        }

        .offer-item i {
          font-size: 34px;   /* 🔥 BIG ICON */
          color: #e53935;
        }

        .offer-text h6 {
          margin: 0;
          font-size: 16px;   /* 🔥 BIG TITLE */
          font-weight: 600;
          color: #111;
        }

        .offer-text p {
          margin: 4px 0 0;
          font-size: 14px;   /* 🔥 BIG SUBTEXT */
          color: #666;
        }

        .offer-divider {
          width: 1px;
          height: 52px;     /* 🔥 TALL DIVIDER */
          background: #ddd;
        }

        @media (max-width: 768px) {
          .offer-container {
            flex-direction: column;
            gap: 22px;
          }

          .offer-divider {
            display: none;
          }

          .offer-item {
            justify-content: center;
          }
        }
      `}</style>

      <div className="offer-strip">
        <div className="offer-container">

          {/* FREE DELIVERY */}
          <div className="offer-item">
            <i className="fa-solid fa-truck"></i>
            <div className="offer-text">
              <h6>Free Delivery</h6>
              <p>To Your Door</p>
            </div>
          </div>

          <div className="offer-divider"></div>

          {/* LOCAL PICKUP */}
          <div className="offer-item">
            <i className="fa-solid fa-basket-shopping"></i>
            <div className="offer-text">
              <h6>Local Pickup</h6>
              <p>Check Out Locations</p>
            </div>
          </div>

          <div className="offer-divider"></div>

          {/* AVAILABLE FOR YOU */}
          <div className="offer-item">
            <i className="fa-solid fa-headset"></i>
            <div className="offer-text">
              <h6>Available for You</h6>
              <p>Online Support 24/7</p>
            </div>
          </div>

          <div className="offer-divider"></div>

          {/* ORDER ON THE GO */}
          <div className="offer-item">
            <i className="fa-solid fa-mobile-screen-button"></i>
            <div className="offer-text">
              <h6>Order on the Go</h6>
              <p>Wholesale Anytime</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default OfferCards;
