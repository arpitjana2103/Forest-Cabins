import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking() {
    const { bookingID } = useParams();

    const {
        isFetching,
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", bookingID],
        queryFn: () => getBooking(bookingID),
        retry: false,
    });

    return { isLoading: isLoading || isFetching, booking, error };
}
