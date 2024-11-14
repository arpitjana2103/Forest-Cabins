import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(duplicate = false) {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabinMutation } = useMutation({
        mutationFn: (newCabin) => {
            if (duplicate) {
                delete newCabin.id;
                delete newCabin.created_at;
                newCabin.image =
                    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";
                newCabin.name += "/copy";
            }
            return createCabin(newCabin);
        },
        onSuccess: () => {
            toast.success(
                duplicate ? "Duplicate Cabin Created." : "New Cabin Created."
            );
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

export function useCreateDuplicateCabin() {
    return useCreateCabin(true);
}
