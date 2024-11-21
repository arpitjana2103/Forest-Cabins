import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/apiAuth";

export default function useLoggedInUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getLoggedInUser,
    });

    return {
        isLoading,
        user,
        isAuthenticated: user?.role === "authenticated",
    };
}
