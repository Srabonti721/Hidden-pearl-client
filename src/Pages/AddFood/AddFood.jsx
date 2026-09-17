import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import apiClient from "../../api/apiClient";
import { Helmet } from "react-helmet-async";

const API_URL = "/foods";

const AddFood = () => {
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const food = {
      foodName: form.get("foodName").trim(),
      image: form.get("image").trim(),
      category: form.get("category").trim(),
      quantity: Number(form.get("quantity")),
      price: Number(form.get("price")),
      // New foods have not been purchased yet. Keeping this value explicit lets
      // the home page rank every food consistently by its sales total.
      purchaseCount: 0,
      foodOrigin: form.get("foodOrigin").trim(),
      description: form.get("description").trim(),
      addedBy: {
        name: user?.displayName || "Hidden Pearl user",
        email: user?.email,
      },
    };

    try {
      await apiClient.post(API_URL, food);

      event.currentTarget.reset();
      await Swal.fire({
        title: "Food added!",
        text: "Your food item has been saved successfully.",
        icon: "success",
        timer: 2200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "Couldn't add food",
        text: "Please try again in a moment.",
        icon: "error",
      });
    }
  };

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
         <title>Add Food - Hidden Pearl</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Share your favorite</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">Add Food</h1>
        <p className="mt-2 text-gray-500">Add the details below to publish a food item to Hidden Pearl.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="form-control sm:col-span-2">
            <span className="mb-2 font-semibold text-gray-700">Food Name</span>
            <input name="foodName" required placeholder="e.g. Beef kala bhuna" className="input w-full border-gray-300" />
          </label>
          <label className="form-control sm:col-span-2">
            <span className="mb-2 font-semibold text-gray-700">Food Image URL</span>
            <input name="image" type="url" required placeholder="https://example.com/food.jpg" className="input w-full border-gray-300" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Food Category</span>
            <input name="category" required placeholder="e.g. Main course" className="input w-full border-gray-300" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Food Origin (Country)</span>
            <input name="foodOrigin" required placeholder="e.g. Bangladesh" className="input w-full border-gray-300" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Quantity</span>
            <input name="quantity" type="number" min="0" step="1" required placeholder="0" className="input w-full border-gray-300" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Price</span>
            <input name="price" type="number" min="0" step="0.01" required placeholder="0.00" className="input w-full border-gray-300" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Added By</span>
            <input value={user?.displayName || "Hidden Pearl user"} readOnly className="input w-full border-gray-200 bg-gray-100 text-gray-600" />
          </label>
          <label className="form-control">
            <span className="mb-2 font-semibold text-gray-700">Email</span>
            <input value={user?.email || ""} readOnly className="input w-full border-gray-200 bg-gray-100 text-gray-600" />
          </label>
          <label className="form-control sm:col-span-2">
            <span className="mb-2 font-semibold text-gray-700">Short Description</span>
            <textarea name="description" required rows="5" placeholder="Describe the ingredients and preparation method..." className="textarea w-full border-gray-300" />
          </label>
        </div>
        <button className="btn mt-8 w-full border-0 bg-orange-500 text-white hover:bg-orange-600">Add Item</button>
      </form>
    </main>
  );
};

export default AddFood;
