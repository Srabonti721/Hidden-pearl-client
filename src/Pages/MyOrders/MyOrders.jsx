import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import apiClient from "../../api/apiClient";

const API_URL = "/purchases";
const getBuyerEmail = (order) => order.buyerEmail || order.email || order.userEmail;
const getOwner = (order) => {
  const owner = order.foodOwner || order.addedBy || order.ownerEmail;
  return typeof owner === "object" ? owner.email || owner.name : owner;
};

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiClient.get(API_URL, {
          signal: controller.signal,
          params: { email: user.email },
        });
        if (!controller.signal.aborted) setOrders(Array.isArray(data) ? data : []);
      } catch (requestError) {
        if (requestError.name !== "AbortError" && requestError.code !== "ERR_CANCELED") setError("We couldn't load your orders right now.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    if (user?.email) loadOrders();
    return () => controller.abort();
  }, [user?.email]);

  const myOrders = useMemo(
    () => orders.filter((order) => getBuyerEmail(order)?.toLowerCase() === user?.email?.toLowerCase()),
    [orders, user?.email],
  );

  const handleDelete = async (orderId) => {
    const confirmation = await Swal.fire({
      title: "Remove this order?",
      text: "This will remove it from your order list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      confirmButtonText: "Delete order",
    });
    if (!confirmation.isConfirmed) return;
    try {
      await apiClient.delete(API_URL + "/" + orderId);
      setOrders((currentOrders) => currentOrders.filter((order) => order._id !== orderId));
      Swal.fire({ icon: "success", title: "Order deleted", timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Couldn't delete the order", text: "Please try again." });
    }
  };

  return (
    <main className="min-h-screen bg-orange-50/40 pb-16">
      <section className="bg-orange-500 px-4 py-16 text-center text-white sm:py-20">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-100">Your purchases</p>
        <h1 className="text-4xl font-bold sm:text-5xl">My Orders</h1>
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {isLoading && <p className="py-12 text-center text-gray-500">Loading your orders...</p>}
        {!isLoading && error && <p className="py-12 text-center text-red-600" role="alert">{error}</p>}
        {!isLoading && !error && myOrders.length === 0 && <p className="rounded-2xl bg-white py-14 text-center text-gray-500 shadow-sm">You have not placed any orders yet.</p>}
        {!isLoading && !error && myOrders.length > 0 && (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="table">
              <thead className="bg-orange-50 text-gray-700"><tr><th>Food</th><th>Price</th><th>Quantity</th><th>Food owner</th><th>Ordered on</th><th className="text-right">Action</th></tr></thead>
              <tbody>{myOrders.map((order) => (
                <tr key={order._id} className="hover:bg-orange-50/40">
                  <td><div className="flex items-center gap-3">{order.foodImage && <img src={order.foodImage} alt="" className="h-12 w-12 rounded-lg object-cover" />}<span className="font-semibold text-gray-800">{order.foodName || "Food item"}</span></div></td>
                  <td>৳{order.price ?? "—"}</td><td>{order.quantity ?? 1}</td><td>{getOwner(order) || "Not available"}</td>
                  <td className="whitespace-nowrap">{order.buyingDate ? moment(order.buyingDate).format("MMMM D, YYYY [at] h:mm A") : "Not available"}</td>
                  <td className="text-right"><button onClick={() => handleDelete(order._id)} className="btn btn-sm border-0 bg-red-500 text-white hover:bg-red-600">Delete</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyOrders;
