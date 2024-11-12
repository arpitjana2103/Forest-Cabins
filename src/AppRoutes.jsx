import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import Users from "./pages/Users";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
});

/**
If you want to use React Query v5, there are only two small things to change in the project:

    1. isLoading is now called isPending
    2. The cacheTime option is now called gcTime
*/

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
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default AppRoutes;
