import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hook/useAuth";

const FoodPurchase = () => {
  const food = useLoaderData();
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const foodName = food.foodName || food.name || "Untitled food";
  const availableQuantity = food.quantity ?? food.availableQuantity ?? food.stock ?? food.foodQuantity;
  const buyerName = user?.displayName || "Not provided";
  const foodOwner = food.addedBy || food.userEmail || food.email;
  const ownerEmail = typeof foodOwner === "object" ? foodOwner.email : foodOwner;
  const isUnavailable = Number(availableQuantity) <= 0;
  const isOwnFood = ownerEmail?.toLowerCase() === user?.email?.toLowerCase();

  const handlePurchase = async (event) => {
    event.preventDefault();
    const amount = Number(quantity);

    if (isUnavailable) {
      Swal.fire({ icon: "info", title: "This food is currently unavailable" });
      return;
    }
    if (isOwnFood) {
      Swal.fire({ icon: "info", title: "You cannot purchase a food you added" });
      return;
    }
    if (!Number.isInteger(amount) || amount < 1) {
      Swal.fire({ icon: "error", title: "Enter a valid quantity" });
      return;
    }
    if (availableQuantity !== undefined && amount > Number(availableQuantity)) {
      Swal.fire({ icon: "error", title: "Quantity exceeds available stock" });
      return;
    }

    const purchase = {
      foodId: food._id,
      foodName,
      price: food.price,
      quantity: amount,
      buyerName,
      buyerEmail: user?.email,
      buyingDate: Date.now(),
      foodImage: food.image,
      foodOwner,
    };

    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:3000/purchases", purchase, {
        headers: authToken ? { Authorization: "Bearer " + authToken } : {},
      });

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order has been placed",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate(`/foods/${food._id}`);
    } catch (error) {
      console.error("Purchase request failed:", error);
      const serverMessage = error.response?.data?.message || error.response?.data?.error;
      Swal.fire({
        icon: "error",
        title: "Order failed",
        text: serverMessage || error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800">Complete your purchase</h1>
        <p className="mt-2 text-gray-500">Review your order details before placing it.</p>

        <form onSubmit={handlePurchase} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Food Name</span>
            <input value={foodName} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-700" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Price</span>
            <input value={`৳${food.price ?? "—"}`} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-700" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Quantity</span>
            <input type="number" min="1" max={availableQuantity} value={quantity} onChange={(event) => setQuantity(event.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
            {availableQuantity !== undefined && <span className="mt-1 block text-sm text-gray-500">{availableQuantity} available</span>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Buyer Name</span>
            <input value={buyerName} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-700" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Buyer Email</span>
            <input value={user?.email || ""} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-700" />
          </label>
          {isUnavailable && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">This food is out of stock and cannot be purchased.</p>}
          {isOwnFood && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">You cannot purchase a food item that you added.</p>}
          <button type="submit" disabled={isSubmitting || isUnavailable || isOwnFood} className="w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300">
            {isSubmitting ? "Placing order..." : isUnavailable ? "Out of stock" : isOwnFood ? "Your food item" : "Purchase"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default FoodPurchase;
