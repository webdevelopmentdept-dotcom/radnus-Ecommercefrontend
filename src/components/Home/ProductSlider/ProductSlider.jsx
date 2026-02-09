import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from './Product';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  swipe: true,          // ✅ ENABLE swipe
  touchMove: true,     // ✅ IMPORTANT for mobile
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        swipe: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,   // ✅ smoother mobile swipe
        swipe: true,
        touchMove: true,
      },
    },
  ],
};



const ProductSlider = ({ title, tagline }) => {
  const { loading, products } = useSelector((state) => state.products);

  if (loading) return null;

  return (
    <section className="best-sellers">

      <h2>{title}</h2>
      {tagline && <p>{tagline}</p>}

      <Slider {...settings}>
        {products?.slice(0, 10)?.map((item) => (
  <Product key={item._id} product={item} />
))}
      </Slider>

      <Link to="/products" className="view-all">
        View All
      </Link>

  <style>{`
/* ===== BEST SELLERS SECTION ===== */
.best-sellers {
  background: #fff;
  padding: 40px 30px;
  margin-top: 20px;
  text-align: center;
}

.best-sellers h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.best-sellers p {
  font-size: 14px;
  color: #777;
  margin-bottom: 24px;
}

/* ===== VIEW ALL BUTTON ===== */
.view-all {
  display: inline-block;
  margin-top: 30px;
  padding: 12px 36px;
  background: #7b2cff;
  color: #fff;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
}

/* ===== SLICK BASE FIX ===== */
.slick-slider {
  width: 100%;
}

.slick-list {
  margin: 0;
}

.slick-track {
  display: flex;
}

.slick-slide {
  height: auto;
}

/* ===== MOBILE FIX ===== */
@media (max-width: 600px) {
  .best-sellers {
    padding: 30px 10px;   /* 🔥 FIXED SIDE GAP */
  }

  .slick-slide {
    padding: 0 6px;       /* 🔥 EVEN SPACING */
    box-sizing: border-box;
  }
}
`}</style>

    </section>
  );
};

export default ProductSlider;
