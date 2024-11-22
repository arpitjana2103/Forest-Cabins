import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: loginMutation, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: ({ user }) => {
            queryClient.setQueryData(["user"], user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("LOGIN-ERROR", err);
            toast.error("Wrong email or password !");
        },
    });

    return { isLoggingIn, login: loginMutation };
}
