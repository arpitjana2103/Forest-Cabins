import { useQuery } from "@tanstack/react-query";
import useUrlParam from "../../hooks/useUrlParam";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
    const { readParam } = useUrlParam();
    const numDays = Number(readParam("last")) || 7;

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}-days`],
    });

    const confirmedStays = stays?.filter(
        (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    );

    return { isLoading, stays, confirmedStays, numDays };
}
