import { use, useState } from "react";
import TopFoodCard from "./TopFoodCard";

const TopFoods = ({ foodsPromice }) => {
  const foods = use(foodsPromice);
  const [showAll, setShowAll] = useState(false);

  const sortedFoods = [...foods].sort(
    (a, b) => b.purchaseCount - a.purchaseCount
  );

  const displayFoods = showAll
    ? sortedFoods
    : sortedFoods.slice(0, 6);

  return (
    <section className="py-16">

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          <span className="text-orange-400">Top</span> Selling  Foods
        </h2>

        <p className="text-gray-500 mt-2">
               Our most popular dishes loved by customers
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFoods.map((food) => (
          <TopFoodCard
            key={food._id}
            food={food}
          />
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

// import React, { use } from 'react'
// import TopFoodCard from './TopFoodCard';

// const TopFoods = ({foodsPromice}) => {
//     const food = use(foodsPromice);
//     const topFoods = food
//     .sort((a, b)=>b.purchaseCount-a.purchaseCount)
//     .slice(0,6)
//     console.log(topFoods);
//     const handleTopFoods = () =>{
//       const allFood = food
//       .slice(0,12)
//     }

//   return (
//     <div>
// <div className='text-center my-10'>
//         <h2 className='text-2xl md:text-4xl font-semibold '> <span className='text-orange-400'>Top</span> Selling Foods</h2>
//       <p className='my-4 text-xl text-gray-500'>Our most popular dishes loved by customers</p>
// </div>
// <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
//   {
//     topFoods.map(food=><TopFoodCard key={food._id} food={food}></TopFoodCard>)
//   }
// </div>

// <div className='text-center'>
// <button onClick={handleTopFoods} className='btn text-2xl my-4'>See More</button>
// </div>
//     </div>
//   )
// }

// export default TopFoods
