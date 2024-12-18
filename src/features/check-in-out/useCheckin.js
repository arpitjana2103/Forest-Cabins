import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isPending: isCheckingIn } = useMutation({
        mutationFn: function ({ bookingID, breakfast }) {
            return updateBooking(bookingID, {
                status: "checked-in",
                isPaid: true,
                ...breakfast,
            });
        },
        onSuccess: function (data) {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate(`/booking/${data.id}`);
        },
        onError: function () {
            toast.error("There was an error while checking in");
        },
    });

    return { checkin, isCheckingIn };
}
