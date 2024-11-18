import Heading from "../ui/styled-elements/Heading";
import Row from "../ui/styled-elements/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <p>TEST</p>
            </Row>

            <BookingTable />
        </>
    );
}

export default Bookings;
