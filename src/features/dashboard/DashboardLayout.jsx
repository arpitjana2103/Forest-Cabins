import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;
function DashboardLayout() {
    const { cabins, isLoading: isCabinsLoading } = useCabins();
    const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isLoading: isLoaidngStays,
        numDays,
    } = useRecentStays();

    if (isLoadingBookings || isLoaidngStays || isCabinsLoading)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <div>Todays Activity</div>
            <div>Chart stay duration</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
