import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSettings() {
    const queryClient = useQueryClient();
    const { isPending: isEditing, mutate: editSettingsMutation } = useMutation({
        mutationFn: (newSettings) => updateSetting(newSettings),
        onSuccess: () => {
            toast.success("Settings Updated");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isEditing, editSettings: editSettingsMutation };
}
