import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const API_URL = "http://localhost:3000/foods";
const getOwnerEmail = (food) => {
  const owner = food.addedBy || food.userEmail || food.email || food.addedByEmail;
  return typeof owner === "object" ? owner.email : owner;
};
const getFoodName = (food) => food.foodName || food.name || "Untitled food";
const getQuantity = (food) => food.quantity ?? food.availableQuantity ?? food.stock ?? food.foodQuantity ?? 0;

const MyFoods = () => {
  const { user, authToken } = useAuth();
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadMyFoods = async () => {
      try {
        setIsLoading(true);
        setError("");
        const { data } = await axios.get(API_URL, {
          signal: controller.signal,
          headers: authToken ? { Authorization: "Bearer " + authToken } : {},
        });
        if (!controller.signal.aborted) setFoods(Array.isArray(data) ? data : []);
      } catch (requestError) {
        if (requestError.name !== "AbortError" && requestError.code !== "ERR_CANCELED") setError("We couldn't load your foods right now. Please try again.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    if (user?.email) loadMyFoods();
    return () => controller.abort();
  }, [authToken, user?.email]);

  const myFoods = useMemo(
    () => foods.filter((food) => getOwnerEmail(food)?.toLowerCase() === user?.email?.toLowerCase()),
    [foods, user?.email],
  );

  return (
    <main className="min-h-screen bg-orange-50/40 pb-16">
      <section className="bg-orange-500 px-4 py-16 text-center text-white sm:py-20">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-100">Your kitchen</p>
        <h1 className="text-4xl font-bold sm:text-5xl">My Foods</h1>
        <p className="mx-auto mt-3 max-w-xl text-orange-100">Manage the foods you have added to Hidden Pearl.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {isLoading && <p className="py-12 text-center text-gray-500">Loading your foods...</p>}
        {!isLoading && error && <p className="py-12 text-center text-red-600" role="alert">{error}</p>}
        {!isLoading && !error && myFoods.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">No foods added yet</h2>
            <p className="mt-2 text-gray-500">Foods associated with {user?.email} will appear here.</p>
          </div>
        )}
        {!isLoading && !error && myFoods.length > 0 && (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="table">
              <thead className="bg-orange-50 text-gray-700"><tr><th>Food</th><th>Category</th><th>Price</th><th>Quantity</th><th className="text-right">Action</th></tr></thead>
              <tbody>{myFoods.map((food) => (
                <tr key={food._id} className="hover:bg-orange-50/40">
                  <td><div className="flex items-center gap-3"><img src={food.image} alt={getFoodName(food)} className="h-14 w-14 rounded-lg object-cover" /><span className="font-semibold text-gray-800">{getFoodName(food)}</span></div></td>
                  <td>{food.category || "Food"}</td><td className="font-semibold">৳{food.price ?? "—"}</td><td>{getQuantity(food)}</td>
                  <td className="text-right"><Link to={"/my-foods/" + food._id + "/edit"} className="btn btn-sm border-0 bg-orange-500 text-white hover:bg-orange-600">Update</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyFoods;
