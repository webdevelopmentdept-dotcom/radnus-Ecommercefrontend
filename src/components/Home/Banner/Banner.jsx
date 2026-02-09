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
/* ===== DESKTOP / DEFAULT ===== */
.efyer-hero {
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.efyer-content {
  position: relative;
  z-index: 2;
  transform: translateY(-36px);
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
  line-height: 1.2;
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

/* ===== SLICK FIX ===== */
.slick-slider {
  position: relative;
  height: 100%;
}

.slick-list,
.slick-track {
  height: 100%;
}

.slick-slide {
  height: 100%;
}

.slick-slide > div {
  height: 100%;
}

/* ===== ARROWS (DESKTOP) ===== */
.efyer-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: background 0.2s ease;
}

.efyer-arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}

.efyer-arrow.left {
  left: 24px;
}

.efyer-arrow.right {
  right: 24px;
}

/* ===== MOBILE VIEW ===== */
@media (max-width: 768px) {
  .efyer-hero {
    height: 55vh;               /* 👈 normal banner height */
    padding: 16px;
  }

  .efyer-content {
    transform: translateY(0);   /* 👈 remove desktop lift */
  }

  .efyer-content h5 {
    font-size: 12px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .efyer-content h1 {
    font-size: 24px;
    line-height: 1.3;
    margin-bottom: 16px;
    font-weight: 700;
  }

  .efyer-btn {
    padding: 10px 24px;
    font-size: 14px;
  }

  /* hide arrows – swipe only */
  .efyer-arrow {
    display: none;
  }
}

/* ===== SMALL MOBILES ===== */
@media (max-width: 480px) {
  .efyer-hero {
    height: 50vh;
  }

  .efyer-content h1 {
    font-size: 22px;
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
