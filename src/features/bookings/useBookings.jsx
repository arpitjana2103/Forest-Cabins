import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import useUrlParam from "../../hooks/useUrlParam";
import { ITMES_PER_PAGE } from "../../utils/constants";

export default function useBookings() {
    const { readParam } = useUrlParam();
    const queryClient = useQueryClient();

    const filterValue = readParam("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const sortByRaw = readParam("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    const page = Number(readParam("page")) || 1;

    const { isFetching, isLoading, data, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(
        (data?.count ? data?.count : 0) / ITMES_PER_PAGE
    );

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    return {
        isLoading: isLoading || isFetching,
        bookings: data?.data,
        count: data?.count,
        error: error,
    };
}
