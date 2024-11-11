import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Login from "./pages/Login";

import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <Navigate replace to="dashboard" /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/settings", element: <Settings /> },
            { path: "/bookings", element: <Bookings /> },
            { path: "/account", element: <Account /> },
            { path: "/cabins", element: <Cabins /> },
            { path: "/users", element: <Users /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <PageNotFound /> },
]);

function AppRoutes() {
    return <RouterProvider router={router} />;
}

export default AppRoutes;
