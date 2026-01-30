import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/* CUSTOM ARROWS */
export const PreviousBtn = ({ onClick }) => (
  <div className="efyer-arrow left" onClick={onClick}>
    <ArrowBackIosIcon />
  </div>
);

export const NextBtn = ({ onClick }) => (
  <div className="efyer-arrow right" onClick={onClick}>
    <ArrowForwardIosIcon />
  </div>
);

const Banner = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    infinite: true,
    arrows: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <>
      {/* ===== BANNER STYLES (NO BACKGROUND HERE) ===== */}
      <style>{`
        .efyer-hero {
          position: relative;
          height: 440px;
          display: flex !important;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          background: transparent; /* 🔥 IMPORTANT */
        }

        .efyer-content {
          position: relative;
          z-index: 2;
        }

        .efyer-content h5 {
          font-size: 16px;
          letter-spacing: 2px;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .efyer-content h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 22px;
        }

        .efyer-btn {
          background: #111;
          color: #fff;
          padding: 14px 36px;
          border-radius: 4px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        /* ===== ARROWS ===== */
        .efyer-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: rgba(0,0,0,0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          color: #fff;
        }

        .efyer-arrow.left {
          left: 24px;
        }

        .efyer-arrow.right {
          right: 24px;
        }

        .efyer-arrow:hover {
          background: rgba(0,0,0,0.55);
        }

        @media (max-width: 768px) {
          .efyer-hero {
            height: 300px;
          }

          .efyer-content h1 {
            font-size: 28px;
          }
        }
      `}</style>

      {/* ===== SLIDER ===== */}
      <Slider {...settings}>
        <div>
          <div className="efyer-hero">
            <div className="efyer-content">
              <h5>GET START</h5>
              <h1>YOUR FAVORITE SHOPPING</h1>
              <button className="efyer-btn">BUY NOW</button>
            </div>
          </div>
        </div>

        <div>
          <div className="efyer-hero">
            <div className="efyer-content">
              <h5>BEST DEALS EVERY DAY</h5>
              <h1>QUALITY ACCESSORIES AT BEST PRICES</h1>
              <button className="efyer-btn">BUY NOW</button>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default Banner;
