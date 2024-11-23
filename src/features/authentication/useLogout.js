import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
            console.log("LOGOUT ERROR", err);
        },
    });

    return { logout: logoutMutation, isLoggingOut: isPending };
}