import styled from "styled-components";
import useLoggedInUser from "../features/authentication/useLoggedInUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    // 1. Load the authenticated user
    const { isLoading: isUserLoading, isAuthenticated } = useLoggedInUser();

    // 2. While loading, show a spinner
    if (isUserLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 3. I there is NO authenticated user, redirect to the /login
    if (!isUserLoading && !isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    // 4. If there is a user, render the app
    if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
