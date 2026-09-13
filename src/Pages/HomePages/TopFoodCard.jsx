import React from 'react'
import { Link } from "react-router";

const TopFoodCard = ({food}) => {
      const {
    _id,
    name,
    image,
    category,
    price,
    purchaseCount,
    description,
  } = food;
    
  return (
<div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      {/* Food Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover"
        />

        {/* Purchase Count */}
        <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          {purchaseCount} sold
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5">

        <p className="text-sm text-gray-500 mb-1">
          {category}
        </p>

        <h3 className="text-xl font-bold text-gray-800">
          {name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold text-orange-500">
            ৳{price}
          </span>

          <Link

            to={`/food/${_id}`}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Details
          </Link>

        </div>
      </div>
    </div>
  )
}

export default TopFoodCard
