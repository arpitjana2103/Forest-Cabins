import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending: isDeleting, mutate: deleteCabinMutation } = useMutation({
        mutationFn: (bookingId) => deleteBooking(bookingId),
        onSuccess: (_, bookingId) => {
            toast.success("Booking successfully deleted");
            queryClient.removeQueries(["booking", bookingId], { exact: true });
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
            navigate("/bookings");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isDeleting, deleteBooking: deleteCabinMutation };
}
