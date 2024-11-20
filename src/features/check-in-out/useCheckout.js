import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationFn: function (bookingID) {
            return updateBooking(bookingID, {
                status: "checked-out",
            });
        },
        onSuccess: function (data) {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true });
            navigate(`/booking/${data.id}`);
        },
        onError: function () {
            toast.error("There was an error while checking out");
        },
    });

    return { checkout, isCheckingOut };
}
