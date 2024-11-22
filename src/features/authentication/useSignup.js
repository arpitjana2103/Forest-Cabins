import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSingup() {
    const { mutate: signupMutation, isPending } = useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            console.log(user);
            toast.success("Account successfully create. Check user email.");
        },
        onError: (err) => {
            toast.error("New user can't be created !");
            console.log(err);
        },
    });

    return { signup: signupMutation, isSigningup: isPending };
}
