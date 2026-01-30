const PriceSidebar = ({ cartItems }) => {

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price || 0);   // ✅ FIX
    const qty = Number(item.quantity || 0);
    return sum + price * qty;
  }, 0);

  const totalCuttedPrice = totalPrice;
  const totalDiscount = 0;

  return (
    <div className="w-full lg:w-1/3 lg:sticky lg:top-16 flex flex-col px-2 lg:px-0">
      <div className="flex flex-col bg-white rounded-sm shadow">
        <h1 className="px-6 py-3 border-b font-medium text-gray-500">
          PRICE DETAILS
        </h1>

        <div className="flex flex-col gap-4 p-6 pb-3">
          <p className="flex justify-between">
            Price ({cartItems.length} item)
            <span>₹{totalCuttedPrice.toLocaleString()}</span>
          </p>

          <p className="flex justify-between">
            Discount
            <span className="text-primary-green">- ₹0</span>
          </p>

          <p className="flex justify-between">
            Delivery Charges
            <span className="text-primary-green">FREE</span>
          </p>

          <div className="border border-dashed"></div>

          <p className="flex justify-between text-lg font-medium">
            Total Amount
            <span>₹{totalPrice.toLocaleString()}</span>
          </p>

          <div className="border border-dashed"></div>

          <p className="font-medium text-primary-green">
            You will save ₹0 on this order
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSidebar;
