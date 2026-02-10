import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { createProduct, clearErrors } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { categories } from "../../utils/category";

import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, success, error } = useSelector((state) => state.newProduct);
  const [distributorPrice, setDistributorPrice] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [customerPrice, setCustomerPrice] = useState("");

  // STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cuttedPrice, setCuttedPrice] = useState("");
  const [stock, setStock] = useState("");
  const [warranty, setWarranty] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  const [specs, setSpecs] = useState([]);
  const [specInput, setSpecInput] = useState({ title: "", description: "" });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // HANDLERS

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
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      setImages((old) => [...old, file]);
      const reader = new FileReader();
      reader.onloadend = () =>
       setImagesPreview((old) => [
  ...old,
  {
    id: `${file.name}-${Date.now()}`,
    url: reader.result,
  },
]);

      reader.readAsDataURL(file);
    });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const addSpec = () => {
    if (!specInput.title || !specInput.description) return;
    setSpecs([...specs, specInput]);
    setSpecInput({ title: "", description: "" });
  };

  // SUBMIT
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
     formData.append("distributorPrice", distributorPrice);
formData.append("dealerPrice", dealerPrice);
formData.append("customerPrice", customerPrice);



    formData.set("cuttedPrice", cuttedPrice);
    formData.set("stock", stock);
    formData.set("warranty", warranty);
    formData.set("category", category);
    formData.set("brand", brand);




    formData.append("logo", logo);
    images.forEach((img) => formData.append("images", img));
    highlights.forEach((h) => formData.append("highlights", h));
    specs.forEach((s) => formData.append("specifications", JSON.stringify(s)));

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Product Created Successfully", { variant: "success" });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Radnus Admin : New Product" />
      {loading && <BackdropLoader />}

      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="bg-white border rounded-md shadow-sm"
        >
          {/* HEADER */}
          <div className="px-6 py-3 border-b">
            <h1 className="text-lg font-semibold text-red-700">Add Product</h1>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">
            {/* BASIC */}
            <div className="grid grid-cols-1 gap-3">
              <TextField
                size="small"
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                size="small"
                multiline
                rows={2}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* PRICE + INVENTORY */}
            <div className="grid grid-cols-4 gap-4">
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
                label="Stock"
                type="number"
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

            {/* CATEGORY */}
            <div className="grid grid-cols-2 gap-4">
              <TextField
                size="small"
                select
                label="Category"
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
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>

            {/* HIGHLIGHTS */}
            <div>
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
                  className="bg-red-600 text-white px-4 rounded text-sm"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    <span>{h}</span>
                    <DeleteIcon
                      fontSize="small"
                      className="text-red-600 cursor-pointer"
                      onClick={() =>
                        setHighlights(highlights.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SPECS */}
            <div>
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
                  className="bg-red-600 text-white px-4 rounded text-sm"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    <span>
                      {s.title}: {s.description}
                    </span>
                    <DeleteIcon
                      fontSize="small"
                      className="text-red-600 cursor-pointer"
                      onClick={() =>
                        setSpecs(specs.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* MEDIA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block border px-3 py-2 rounded text-sm cursor-pointer text-center">
                  Upload Logo
                  <input
                    type="file"
                    name="logo"
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
                <label className="block border px-3 py-2 rounded text-sm cursor-pointer text-center">
                  Upload Images
                  <input
                    type="file"
                    name="images"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                  />
                </label>
               <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="images" direction="horizontal">
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
                className="cursor-move"
              >
                <img
                   src={img.url}
                  alt="preview"
                  className="h-16 object-cover rounded border"
                />
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

          {/* FOOTER */}
          <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded text-sm font-medium">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;