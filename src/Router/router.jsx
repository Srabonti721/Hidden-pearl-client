import { createBrowserRouter } from "react-router";
import MainLayout from "../Layoute/MainLayout";
import AllFoods from "../Pages/AllFoods/AllFoods";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Gallery from "../Pages/Gallery/Gallery";
import Home from "../Pages/HomePages/Home";
import SingleFood from "../Pages/singleFood/SingleFood";
import FoodPurchase from "../Pages/FoodPurchase/FoodPurchase";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import MyFoods from "../Pages/MyFoods/MyFoods";
import UpdateFood from "../Pages/UpdateFood/UpdateFood";
import AddFood from "../Pages/AddFood/AddFood";
import MyOrders from "../Pages/MyOrders/MyOrders";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "allFoods",
                Component: AllFoods,
            },
            {
                path: "foods/:id",
                Component: SingleFood,
                loader: ({ params }) =>
                    axios.get(`http://localhost:3000/foods/${params.id}`).then((response) => response.data),
            },
            {
                path: "/food-purchase/:id",
                loader: ({ params }) => axios.get(`http://localhost:3000/foods/${params.id}`).then((response) => response.data),
                element: (
                    <PrivateRoute>
                        <FoodPurchase />
                    </PrivateRoute>
                ),
            },
            {
                path: "gallery",
                Component: Gallery,
            },
            {
                path: "my-foods",
                element: <PrivateRoute><MyFoods /></PrivateRoute>,
            },
            {
                path: "my-foods/:id/edit",
                element: <PrivateRoute><UpdateFood /></PrivateRoute>,
            },
            {
                path: "add-food",
                element: <PrivateRoute><AddFood /></PrivateRoute>,
            },
            {
                path: "my-orders",
                element: <PrivateRoute><MyOrders /></PrivateRoute>,
            },
            {
                path: "register",
                Component: Register,
            },
            {
                path: "login",
                Component: Login,
            },
        ],
    },
]);

export default router;
