import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Banner from "./Banner/Banner";

import OfferCards from "./Banner/OfferCards";
import ProductSlider from "./ProductSlider/ProductSlider";
import PromoSection from "./PromoSection/PromoSection";
import EssentialProducts from "./EssentialProducts/EssentialProducts";



import { clearErrors, getSliderProducts } from "../../actions/productAction";
import MetaData from "../Layouts/MetaData";

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Radnus – Mobile Accessories Wholesale & Dealer Portal" />

      {/* ===== EFYER HERO AREA (ONE BACKGROUND) ===== */}
      <section className="efyer-hero-wrapper">
        

        <Banner />
      </section>

      {/* ===== BELOW CONTENT ===== */}
      <main className="bg-white relative z-10">

        <OfferCards />

        {!loading && (
          <>
            <ProductSlider
              title="Best Selling Accessories"
              tagline="Fast-moving stock trusted by customer"
            />

            <div
              style={{
                background: "#f9fafb",
                border: "1px dashed #e5e7eb",
                padding: "8px 12px",
                marginTop: "-12px",
                marginBottom: "22px",
                fontSize: "13px",
                color: "#374151",
                borderRadius: "4px",
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <span>⚡ Bulk orders supported</span>
              <span>📦 Minimum order quantity applies</span>
              <span>🧾 GST invoice available</span>
            </div>
          </>
        )}

        <PromoSection />

        {!loading && (
          <div className="bg-gray-100 py-6">
            <ProductSlider
              title="Recommended For You"
              tagline="Popular picks our customers love"
            />
          </div>
        )}

        <EssentialProducts />
      </main>

      {/* ===== HERO BACKGROUND + SMOKE EFFECT ===== */}
      <style>{`
        .efyer-hero-wrapper {
  position: relative;
  background-image: url("/sample.avif"); /* 🔥 ONLY IMAGE */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 120px;
}
        .efyer-hero-wrapper::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 160px;
         background: linear-gradient(
  to bottom,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.4) 45%,
  rgba(255,255,255,0.7) 75%,
  #fcf7f7 100%
);

          pointer-events: none;
          z-index: 1;

          @media (max-width: 640px) {
  .efyer-hero-wrapper {
    padding-top: 140px;
  }
}
        }
      `}</style>
    </>
  );
};

export default Home;
