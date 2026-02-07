import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../Layouts/Loader";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/category";
import MetaData from "../Layouts/MetaData";

const Products = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();

  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  const [ratings, setRatings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  

  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useSelector((state) => state.user);


  const {
    products,
    loading,
    error,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = params.keyword;

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setRatings(0);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, category, price, ratings, currentPage));
  }, [
    dispatch,
    keyword,
    category,
    price,
    ratings,
    currentPage,
    error,
    enqueueSnackbar,
  ]);

  return (
    <>
     <MetaData
  title="All Mobile Accessories & Tools | Radnus Communication"
  description="Browse all mobile accessories, chargers, cables and tools at wholesale and retail prices from Radnus Communication."
  keywords="mobile accessories, chargers, cables,best chargers, radnus"
  image="https://radnusone.com/images/logo2.png"
  url="https://radnusone.com/products"
  robots="index, follow"
/>


 <main className="w-full">

        <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 mb-7 w-full">

          {/* ================= FILTER SIDEBAR ================= */}
          <div
            className={`fixed inset-0 bg-black/50 z-50 sm:static sm:bg-transparent sm:z-auto
              ${showFilters ? "block" : "hidden sm:flex"}`}
            onClick={() => setShowFilters(false)}
          >
            <div
              className="bg-white w-4/5 h-full sm:w-full sm:h-auto px-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col bg-white rounded-sm shadow">

                {/* FILTER HEADER */}
                <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                  <p className="text-lg font-medium">Filters</p>

                  <div className="flex items-center gap-3">
                    <span
                      className="uppercase text-primary-blue text-xs cursor-pointer font-medium"
                      onClick={clearFilters}
                    >
                      clear all
                    </span>

                    {/* MOBILE CLOSE */}
                    <span
                      className="sm:hidden text-lg cursor-pointer"
                      onClick={() => setShowFilters(false)}
                    >
                      ✕
                    </span>
                  </div>
                </div>

                {/* FILTER BODY */}
                <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                  {/* PRICE */}
                  <div className="flex flex-col gap-2 border-b px-4">
                    <span className="font-medium text-xs">PRICE</span>

                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      min={0}
                      max={200000}
                    />

                    <div className="flex gap-3 items-center justify-between mb-2">
                      <span className="flex-1 border px-4 py-1 rounded-sm bg-gray-50">
                        ₹{price[0].toLocaleString()}
                      </span>
                      <span className="text-gray-400">to</span>
                      <span className="flex-1 border px-4 py-1 rounded-sm bg-gray-50">
                        ₹{price[1].toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="flex flex-col border-b px-4">
                    <div
                      className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                      onClick={() => setCategoryToggle(!categoryToggle)}
                    >
                      <p className="font-medium text-xs uppercase">Category</p>
                      {categoryToggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>

                    {categoryToggle && (
                      <FormControl>
                        <RadioGroup
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories.map((el) => (
                            <FormControlLabel
                              key={el}
                              value={el}
                              control={<Radio size="small" />}
                              label={<span className="text-sm">{el}</span>}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </div>

                  {/* RATINGS */}
                  <div className="flex flex-col border-b px-4">
                    <div
                      className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                      onClick={() => setRatingsToggle(!ratingsToggle)}
                    >
                      <p className="font-medium text-xs uppercase">ratings</p>
                      {ratingsToggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>

                    {ratingsToggle && (
                      <FormControl>
                        <RadioGroup
                          value={ratings}
                          onChange={(e) => setRatings(e.target.value)}
                        >
                          {[4, 3, 2, 1].map((el) => (
                            <FormControlLabel
                              key={el}
                              value={el}
                              control={<Radio size="small" />}
                              label={
                                <span className="flex items-center text-sm">
                                  {el}
                                  <StarIcon sx={{ fontSize: 12, ml: 0.5 }} /> &
                                  above
                                </span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PRODUCT LIST ================= */}
          <div className="flex-1">

            {/* MOBILE FILTER BUTTON */}
            <div className="sm:hidden flex justify-end mb-2 px-2">
              <button
                onClick={() => setShowFilters(true)}
                className="border px-3 py-1 text-sm rounded"
              >
                Filters
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col gap-2 pb-4 items-center w-full bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-4 w-full pb-4 border-b">
                  {products?.map((product) => {
  let displayPrice = 0;

  if (user?.role === "dealer") {
    displayPrice = product.prices?.dealer;
  } else if (user?.role === "distributor") {
    displayPrice = product.prices?.distributor;
  } else {
    // customer / not logged in
    displayPrice = product.prices?.customer;
  }

  return (
    <Product
      key={product._id}
      {...product}
      price={displayPrice}   // 🔥 IMPORTANT
    />
  );
})}

                </div>

                {filteredProductsCount > resultPerPage && (
                  <Pagination
                    count={Math.ceil(filteredProductsCount / resultPerPage)}
                    page={currentPage}
                    onChange={(e, val) => setCurrentPage(val)}
                    color="primary"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
