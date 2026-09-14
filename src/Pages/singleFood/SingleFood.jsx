import React from 'react'
import { useLoaderData } from 'react-router'
import { useNavigate } from "react-router";
const SingleFood = () => {
    const foodsData = useLoaderData();
    const navigate = useNavigate();
    console.log(foodsData);

      const {
    _id,
    foodName,
    image,
    price,
    category,
    description,
    purchaseCount = 0,
  } = foodsData;

  const handlePurchase = () => {
    navigate(`/food-purchase/${_id}`);
  };


  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Food Image */}
        <div>
          <img
            src={image}
            alt={foodName}
            className="w-full h-100 object-cover rounded-sm"
          />
        </div>

        {/* Food Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {foodName}
          </h1>

          <p className="text-gray-600 mb-4">
            {description}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {category}
          </p>

          <p className="text-xl font-bold mb-2">
            Price: ৳{price}
          </p>

          <p className="mb-6">
            <span className="font-semibold">Purchase Count:</span>{" "}
            {purchaseCount}
          </p>

          <button
            onClick={handlePurchase}
            className="btn btn-primary"
          >
            Purchase
          </button>
        </div>

      </div>
    </div>

  )
}

export default SingleFood
