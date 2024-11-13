import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabinMutation } = useMutation({
        mutationFn: (newCabin) => createCabin(newCabin),
        onSuccess: () => {
            toast.success("New Cabin Created.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isCreating, createCabin: createCabinMutation };
}
