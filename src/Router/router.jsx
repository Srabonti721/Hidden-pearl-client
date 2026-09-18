import { createBrowserRouter } from "react-router";
import MainLayout from "../Layoute/MainLayout";
import AddFood from "../Pages/AddFood/AddFood";
import AllFoods from "../Pages/AllFoods/AllFoods";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ErrorPages from "../Pages/Errorpages/ErrorPages";
import FoodPurchase from "../Pages/FoodPurchase/FoodPurchase";
import Gallery from "../Pages/Gallery/Gallery";
import Home from "../Pages/HomePages/Home";
import MyFoods from "../Pages/MyFoods/MyFoods";
import MyOrders from "../Pages/MyOrders/MyOrders";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import UpdateFood from "../Pages/UpdateFood/UpdateFood";
import SingleFood from "../Pages/singleFood/SingleFood";
import apiClient from "../api/apiClient";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPages></ErrorPages>,
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
                    apiClient
                        .get(`/foods/${params.id}`)
                        .then((response) => response.data),
            },
            {
                path: "/food-purchase/:id",
                loader: ({ params }) =>
                    apiClient
                        .get(`/foods/${params.id}`)
                        .then((response) => response.data),
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
                element: (
                    <PrivateRoute>
                        <MyFoods />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-foods/:id/edit",
                element: (
                    <PrivateRoute>
                        <UpdateFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "add-food",
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-orders",
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
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
