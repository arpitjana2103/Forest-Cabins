import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import useUrlParam from "../../hooks/useUrlParam";

export default function useBookings() {
    const { readParam } = useUrlParam();

    const filterValue = readParam("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const sortByRaw = readParam("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    const page = readParam("page");

    const { isFetching, isLoading, data, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return {
        isLoading: isLoading || isFetching,
        bookings: data?.data,
        count: data?.count,
        error: error,
    };
}
