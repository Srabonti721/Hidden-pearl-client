import { Link, useLoaderData } from "react-router";

const SingleFood = () => {
  const food = useLoaderData();
  const { _id, image, price, category, description, purchaseCount = 0 } = food;
  const foodName = food.foodName || food.name || "Untitled food";
  const quantity = food.quantity ?? food.availableQuantity ?? food.stock ?? food.foodQuantity;
  const addedBy = food.addedBy || food.userEmail || food.email;

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid md:grid-cols-2">
          <div className="bg-gray-100">
            <img src={image} alt={foodName} className="h-80 w-full object-cover md:h-full md:min-h-[34rem]" />
          </div>

          <div className="p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">{category || "Food"}</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">{foodName}</h1>
            <p className="mt-5 leading-7 text-gray-600">{description || "No description available for this food."}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-orange-100 py-6 text-sm">
              <div>
                <dt className="text-gray-500">Price</dt>
                <dd className="mt-1 text-xl font-bold text-gray-800">৳{price ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Purchase count</dt>
                <dd className="mt-1 text-xl font-bold text-gray-800">{purchaseCount}</dd>
              </div>
              {quantity !== undefined && (
                <div>
                  <dt className="text-gray-500">Available quantity</dt>
                  <dd className="mt-1 font-semibold text-gray-800">{quantity}</dd>
                </div>
              )}
              {addedBy && (
                <div>
                  <dt className="text-gray-500">Added by</dt>
                  <dd className="mt-1 break-all font-semibold text-gray-800">{typeof addedBy === "object" ? addedBy.email || addedBy.name : addedBy}</dd>
                </div>
              )}
            </dl>

            <Link
              to={`/food-purchase/${_id}`}
              className="mt-8 inline-flex rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Purchase
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleFood;
