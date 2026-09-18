import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import TopFoodCard from "./TopFoodCard";

const TopFoods = () => {
    const [foods, setFoods] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const getFoods = async () => {
            const res = await apiClient.get("/foods");
            setFoods(res?.data);
        };
        getFoods();
    }, []);

    const sortedFoods = [...foods].sort(
        (a, b) => Number(b.purchaseCount ?? 0) - Number(a.purchaseCount ?? 0),
    );

    const displayFoods = showAll ? sortedFoods : sortedFoods.slice(0, 6);

    return (
        <section className="py-16 px-2">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">
                    <span className="text-orange-400">Top</span> Selling Foods
                </h2>

                <p className="text-gray-500 mt-2">
                    Our most popular dishes loved by customers
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayFoods.map((food) => (
                    <TopFoodCard key={food._id} food={food} />
                ))}
            </div>

            {/* More Button */}
            {!showAll && sortedFoods.length > 6 && (
                <div className="text-center mt-10">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        More Foods
                    </button>
                </div>
            )}
        </section>
    );
};

export default TopFoods;
