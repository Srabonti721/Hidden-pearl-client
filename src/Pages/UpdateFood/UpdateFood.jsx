import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const API_URL = "http://localhost:3000/foods";
const getOwnerEmail = (food) => {
  const owner = food.addedBy || food.userEmail || food.email || food.addedByEmail;
  return typeof owner === "object" ? owner.email : owner;
};

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authToken } = useAuth();
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadFood = async () => {
      try {
        const { data } = await axios.get(API_URL + "/" + id, {
          signal: controller.signal,
          headers: authToken ? { Authorization: "Bearer " + authToken } : {},
        });
        if (!controller.signal.aborted) setFood(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError" && requestError.code !== "ERR_CANCELED") setError("We couldn't load this food item.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    loadFood();
    return () => controller.abort();
  }, [authToken, id]);

  const isOwner = food && getOwnerEmail(food)?.toLowerCase() === user?.email?.toLowerCase();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isOwner) return;
    const form = new FormData(event.currentTarget);
    const updatedFood = {
      ...food,
      foodName: form.get("foodName").trim(),
      image: form.get("image").trim(),
      category: form.get("category").trim(),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      description: form.get("description").trim(),
    };
    try {
      setIsSaving(true);
      await axios.patch(API_URL + "/" + id, updatedFood, {
        headers: authToken ? { Authorization: "Bearer " + authToken } : {},
      });
      await Swal.fire({ title: "Food updated", text: "Your changes have been saved.", icon: "success" });
      navigate("/my-foods");
    } catch {
      Swal.fire({ title: "Update failed", text: "Please try again.", icon: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p className="py-16 text-center text-gray-500">Loading food...</p>;
  if (error) return <p className="py-16 text-center text-red-600" role="alert">{error}</p>;
  if (!isOwner) return <main className="py-16 text-center"><h1 className="text-2xl font-bold text-gray-800">You can only update your own foods.</h1><Link to="/my-foods" className="mt-5 inline-block text-orange-600 underline">Back to My Foods</Link></main>;

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800">Update Food</h1>
        <p className="mt-2 text-gray-500">Update the details for your food item.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="form-control sm:col-span-2"><span className="mb-2 font-semibold text-gray-700">Food name</span><input name="foodName" defaultValue={food.foodName || food.name || ""} required className="input w-full border-gray-300" /></label>
          <label className="form-control sm:col-span-2"><span className="mb-2 font-semibold text-gray-700">Image URL</span><input name="image" type="url" defaultValue={food.image || ""} required className="input w-full border-gray-300" /></label>
          <label className="form-control"><span className="mb-2 font-semibold text-gray-700">Category</span><input name="category" defaultValue={food.category || ""} required className="input w-full border-gray-300" /></label>
          <label className="form-control"><span className="mb-2 font-semibold text-gray-700">Price</span><input name="price" type="number" min="0" step="0.01" defaultValue={food.price ?? ""} required className="input w-full border-gray-300" /></label>
          <label className="form-control"><span className="mb-2 font-semibold text-gray-700">Quantity</span><input name="quantity" type="number" min="0" step="1" defaultValue={food.quantity ?? food.availableQuantity ?? food.stock ?? food.foodQuantity ?? 0} required className="input w-full border-gray-300" /></label>
          <label className="form-control sm:col-span-2"><span className="mb-2 font-semibold text-gray-700">Description</span><textarea name="description" defaultValue={food.description || ""} required rows="4" className="textarea w-full border-gray-300" /></label>
        </div>
        <div className="mt-8 flex gap-3"><Link to="/my-foods" className="btn">Cancel</Link><button disabled={isSaving} className="btn border-0 bg-orange-500 text-white hover:bg-orange-600">{isSaving ? "Saving..." : "Update food"}</button></div>
      </form>
    </main>
  );
};

export default UpdateFood;
