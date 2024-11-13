import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient();
    const { isPending: isEditing, mutate: editCabinMutation } = useMutation({
        mutationFn: ({ newCabin, id }) => editCabin(newCabin, id),
        onSuccess: () => {
            toast.success("Cabin Edited.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });

    return { isEditing, editCabin: editCabinMutation };
}
