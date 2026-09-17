import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const API_URL = "http://localhost:3000/foods";

const getFoodName = (food) => food.foodName || food.name || "Untitled food";
const getQuantity = (food) =>
  food.quantity ?? food.availableQuantity ?? food.stock ?? food.foodQuantity ?? 0;

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadFoods = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(API_URL, { signal: controller.signal });
        setFoods(Array.isArray(data) ? data : []);
      } catch (requestError) {
        if (requestError.name !== "AbortError" && requestError.code !== "ERR_CANCELED") {
          setError("We couldn't load the menu right now. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadFoods();
    return () => controller.abort();
  }, []);

  const visibleFoods = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return foods;

    return foods.filter((food) =>
      [getFoodName(food), food.category, food.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [foods, search]);

  return (
    <main className="min-h-screen bg-orange-50/40 pb-16">
      <Helmet>
        <title>All Foods - Hidden Pearl</title>
      </Helmet>
      <section className="bg-orange-500 px-4 py-16 text-center text-white sm:py-20">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-100">
          Hidden Pearl menu
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">All Foods</h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl">
          <label htmlFor="food-search" className="sr-only">Search foods</label>
          <input
            id="food-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by food name, category, or description..."
            className="w-full rounded-xl border border-orange-200 bg-white px-5 py-3 text-gray-800 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {isLoading && <p className="py-12 text-center text-gray-500">Loading foods...</p>}
        {!isLoading && error && <p className="py-12 text-center text-red-600" role="alert">{error}</p>}
        {!isLoading && !error && visibleFoods.length === 0 && <p className="py-12 text-center text-gray-500">No foods match your search.</p>}

        {!isLoading && !error && visibleFoods.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFoods.map((food) => {
              const name = getFoodName(food);
              const quantity = getQuantity(food);

              return (
                <article key={food._id} className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={food.image} alt={name} className="h-56 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
                  <div className="p-5">
                    <p className="text-sm font-medium text-orange-500">{food.category || "Food"}</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-800">{name}</h2>
                    {food.description && <p className="mt-2 line-clamp-2 text-sm text-gray-500">{food.description}</p>}
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-bold text-gray-800">৳{food.price ?? "—"}</p>
                        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                      </div>
                      <Link to={`/foods/${food._id}`} className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600">Details</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default AllFoods;
