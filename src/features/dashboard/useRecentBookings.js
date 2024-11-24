import { useQuery } from "@tanstack/react-query";
import useUrlParam from "../../hooks/useUrlParam";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
    const { readParam } = useUrlParam();
    const numDays = Number(readParam("last")) || 7;

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}-days`],
    });

    return { isLoading, bookings };
}
