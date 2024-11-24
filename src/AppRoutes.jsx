import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import AccountPage from "./pages/AccountPage";
import BookingsPage from "./pages/BookingsPage";
import CabinsPage from "./pages/CabinsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import BookingPage from "./pages/BookingPage";
import CheckinPage from "./pages/CheckinPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            // staleTime: 0,
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
            element: (
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            ),
            children: [
                { path: "/", element: <Navigate replace to="dashboard" /> },
                { path: "/checkin/:bookingID", element: <CheckinPage /> },
                { path: "/booking/:bookingID", element: <BookingPage /> },
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
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_normalizeFormMethod: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

function AppRoutes() {
    return (
        <DarkModeProvider>
            <GlobalStyles />
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
        </DarkModeProvider>
    );
}

export default AppRoutes;
