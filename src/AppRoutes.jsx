import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import CabinsPage from "./pages/CabinsPage";
import AccountPage from "./pages/AccountPage";
import BookingsPage from "./pages/BookingsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";

import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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

const router = createBrowserRouter(
    [
        {
            element: <AppLayout />,
            children: [
                { path: "/", element: <Navigate replace to="dashboard" /> },
                { path: "/dashboard", element: <DashboardPage /> },
                { path: "/settings", element: <SettingsPage /> },
                { path: "/bookings", element: <BookingsPage /> },
                { path: "/account", element: <AccountPage /> },
                { path: "/cabins", element: <CabinsPage /> },
                { path: "/users", element: <UsersPage /> },
            ],
        },
        { path: "/login", element: <LoginPage /> },
        { path: "*", element: <PageNotFoundPage /> },
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

function AppRoutes() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider
                router={router}
                future={{ v7_startTransition: true }}
            />
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-gery-700)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default AppRoutes;
