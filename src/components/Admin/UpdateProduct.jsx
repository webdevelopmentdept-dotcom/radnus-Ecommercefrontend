import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import {
  UPDATE_PRODUCT_RESET,
  REMOVE_PRODUCT_DETAILS,
} from "../../constants/productConstants";
import { categories } from "../../utils/category";

import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: updateLoading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.product);

  useEffect(() => {
  dispatch({ type: REMOVE_PRODUCT_DETAILS });
  dispatch(getProductDetails(id));
}, [dispatch, id]);

useEffect(() => {
  console.log("PRODUCT FROM API 👉", product);
}, [product]);


useEffect(() => {
  if (!product) return;

  setName(product.name || "");
  setDescription(product.description || "");
  setStock(product.stock || "");
  setWarranty(product.warranty || "");
  setCategory(product.category || "");
  setBrand(product.brand?.name || "");

  // ✅ SAME AS PRODUCT TABLE
 setCustomerPrice(product.price || "");
setDealerPrice(product.price || "");
setDistributorPrice(product.price || "");


  setHighlights(product.highlights || []);
  setSpecs(product.specifications || []);
  setOldImages(product.images || []);
  setLogoPreview(product.brand?.logo?.url || "");
}, [product]);



  // ===== STATES =====
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [stock, setStock] = useState("");
  const [warranty, setWarranty] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  const [specs, setSpecs] = useState([]);
  const [specInput, setSpecInput] = useState({ title: "", description: "" });
  const [deletedImages, setDeletedImages] = useState([]);
  const [distributorPrice, setDistributorPrice] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [customerPrice, setCustomerPrice] = useState("");

  // Product Images
  const [oldImages, setOldImages] = useState([]); // existing product images (URLs from server)
  const [images, setImages] = useState([]); // new uploaded files
  const [imagesPreview, setImagesPreview] = useState([]); // preview of new files

  // Logo
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // ===== HANDLERS =====

  const onDragEnd = (result) => {
  if (!result.destination) return;

  const reorderedImages = Array.from(images);
  const reorderedPreviews = Array.from(imagesPreview);

  const [movedImage] = reorderedImages.splice(result.source.index, 1);
  const [movedPreview] = reorderedPreviews.splice(result.source.index, 1);

  reorderedImages.splice(result.destination.index, 0, movedImage);
  reorderedPreviews.splice(result.destination.index, 0, movedPreview);

  setImages(reorderedImages);
  setImagesPreview(reorderedPreviews);
};

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

 const handleImagesChange = (e) => {
  const files = Array.from(e.target.files);

  setImages(files);
  setImagesPreview([]);
  

// 🔥 VERY IMPORTANT
setOldImages([]);        // remove old images from state
setDeletedImages([]);    // reset deleted list


  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagesPreview((old) => [
        ...old,
        {
          id: `${file.name}-${index}`,
          url: reader.result,
        },
      ]);
    };
    reader.readAsDataURL(file);
  });
};


  const deleteOldImage = (index) => {
    setDeletedImages((prev) => [...prev, oldImages[index]]);
    setOldImages(oldImages.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    if (!specInput.title.trim() || !specInput.description.trim()) return;
    setSpecs([...specs, specInput]);
    setSpecInput({ title: "", description: "" });
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // ===== SUBMIT =====
  const submitHandler = (e) => {
    e.preventDefault();

    if (highlights.length <= 0) {
      enqueueSnackbar("Add Highlights", { variant: "warning" });
      return;
    }
    if (specs.length <= 1) {
      enqueueSnackbar("Add minimum 2 Specifications", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("stock", stock);
    formData.set("warranty", warranty);
    formData.set("category", category);
    formData.set("brandname", brand);
    formData.append("distributorPrice", distributorPrice);
    formData.append("dealerPrice", dealerPrice);
    formData.append("customerPrice", customerPrice);

    if (logo) formData.append("logo", logo);

    // New images
    images.forEach((img) => formData.append("images", img));

    // Old images (URLs or IDs)
    deletedImages.forEach((img) => formData.append("deletedImages", img.url));

    highlights.forEach((h) => formData.append("highlights", h));
    specs.forEach((s) => formData.append("specifications", JSON.stringify(s)));

    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
    dispatch(clearErrors());
  }

  if (updateError) {
    enqueueSnackbar(updateError, { variant: "error" });
    dispatch(clearErrors());
  }

  if (isUpdated) {
    enqueueSnackbar("Product Updated Successfully", { variant: "success" });
    dispatch({ type: UPDATE_PRODUCT_RESET });
    dispatch({ type: REMOVE_PRODUCT_DETAILS });
    navigate("/admin/products");
  }
}, [
  dispatch,
  error,
  updateError,
  isUpdated,
  enqueueSnackbar,
  navigate,
]);


  // // ===== PREFILL DATA =====
  // useEffect(() => {
  //   if (!product || product._id !== id) {
  //     dispatch(getProductDetails(id));
  //   } else {
  //     setName(product.name);
  //     setDescription(product.description);

  //     setStock(product.stock);
  //     setWarranty(product.warranty);
  //     setCategory(product.category);
  //     setBrand(product.brand.name);
  //     setDistributorPrice(product.prices?.distributor || "");
  //     setDealerPrice(product.prices?.dealer || "");
  //     setCustomerPrice(product.prices?.customer || "");

  //     setHighlights(product.highlights || []);
  //     setSpecs(product.specifications || []);
  //     setOldImages(product.images || []);
  //     setLogoPreview(product.brand.logo?.url || "");
  //   }

  //   if (error) {
  //     enqueueSnackbar(error, { variant: "error" });
  //     dispatch(clearErrors());
  //   }

  //   if (updateError) {
  //     enqueueSnackbar(updateError, { variant: "error" });
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     enqueueSnackbar("Product Updated Successfully", { variant: "success" });
  //     dispatch({ type: UPDATE_PRODUCT_RESET });
  //     dispatch({ type: REMOVE_PRODUCT_DETAILS });
  //     navigate("/admin/products");

  //     // Clear local images after success
  //     setImages([]);
  //     setImagesPreview([]);

      
  //   }
  // }, [
  //   dispatch,
  //   product,
  //   id,
  //   error,
  //   updateError,
  //   isUpdated,
  //   enqueueSnackbar,
  //   navigate,
  // ]);

  return (
    <>
      <MetaData title="Radnus Admin: Update Product" />
      {(loading || updateLoading) && <BackdropLoader />}

      <div className="max-w-6xl mx-auto my-6 p-4 bg-white rounded shadow">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              size="small"
              label="Product Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              size="small"
              multiline
              rows={3}
              label="Description *"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* PRICE & STOCK */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <TextField
              size="small"
              label="Distributor Price"
              type="number"
              value={distributorPrice}
              onChange={(e) => setDistributorPrice(e.target.value)}
              required
            />

            <TextField
              size="small"
              label="Dealer Price"
              type="number"
              value={dealerPrice}
              onChange={(e) => setDealerPrice(e.target.value)}
              required
            />

            <TextField
              size="small"
              label="Customer Price"
              type="number"
              value={customerPrice}
              onChange={(e) => setCustomerPrice(e.target.value)}
              required
            />

            <TextField
              size="small"
              type="number"
              label="Stock *"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          <TextField
  size="small"
  select
  label="Warranty"
  value={warranty}
  onChange={(e) => setWarranty(e.target.value)}
  required
>
  <MenuItem value={6}>6 Months</MenuItem>
  <MenuItem value={12}>1 Year</MenuItem>
  <MenuItem value={18}>18 Months</MenuItem>
  <MenuItem value={24}>2 Years</MenuItem>
  <MenuItem value={36}>3 Years</MenuItem>
</TextField>

          </div>

          {/* CATEGORY & BRAND */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              size="small"
              select
              label="Category *"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((c, i) => (
                <MenuItem key={i} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              label="Brand *"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          {/* HIGHLIGHTS */}
          <div className="mb-4">
            <div className="flex gap-2">
              <TextField
                size="small"
                fullWidth
                label="Add Highlight"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addHighlight}
                className="bg-red-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-100 px-2 py-1 rounded"
                >
                  <span>{h}</span>
                  <DeleteIcon
                    fontSize="small"
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteHighlight(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="mb-4">
            <div className="flex gap-2">
              <TextField
                size="small"
                label="Spec Name"
                value={specInput.title}
                onChange={(e) =>
                  setSpecInput({ ...specInput, title: e.target.value })
                }
              />
              <TextField
                size="small"
                label="Spec Value"
                value={specInput.description}
                onChange={(e) =>
                  setSpecInput({ ...specInput, description: e.target.value })
                }
              />
              <button
                type="button"
                onClick={addSpec}
                className="bg-red-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-100 px-2 py-1 rounded"
                >
                  <span>
                    {s.title}: {s.description}
                  </span>
                  <DeleteIcon
                    fontSize="small"
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteSpec(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MEDIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block border px-3 py-2 rounded text-center cursor-pointer">
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
              {logoPreview && (
                <img src={logoPreview} alt="logo" className="h-16 mt-2" />
              )}
            </div>

            <div>
              <label className="block border px-3 py-2 rounded text-center cursor-pointer">
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImagesChange}
                />
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {/* OLD IMAGES (NO DRAG, ONLY DELETE) */}
{imagesPreview.length === 0 &&
  oldImages.map((img, i) => (
    <div key={i} className="relative">
      <img
        src={img.url}
        alt="old"
        className="h-16 object-cover rounded"
      />
      <span
        onClick={() => deleteOldImage(i)}
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 cursor-pointer"
      >
        X
      </span>
    </div>
  ))
}


{/* NEW IMAGES (DRAGGABLE) */}
<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="newImages" direction="horizontal">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="grid grid-cols-4 gap-2 mt-2"
      >
        {imagesPreview.map((img, index) => (
          <Draggable
            key={img.id}
            draggableId={img.id}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="cursor-move relative"
              >
                <img
                  src={img.url}
                  alt="preview"
                  className="h-16 object-cover rounded border"
                />
                {index === 0 && (
                  <span className="absolute top-0 left-0 bg-green-600 text-white text-xs px-1 rounded">
                    Main
                  </span>
                )}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded text-sm font-medium">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;