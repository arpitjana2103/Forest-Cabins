import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack.hook";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import useBooking from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";

import { formatCurrency } from "../../utils/helpers";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { isLoading, booking = {} } = useBooking();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const { checkin, isCheckingIn } = useCheckin();

    useEffect(
        function () {
            setConfirmPaid(booking.isPaid);
        },
        [booking]
    );

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
        status,
    } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const checkedInAlready = status === "checked-in";

    function handleCheckin() {
        if (!confirmPaid) return toast.error("Payment not confirmed !");
        checkin(bookingId);
    }

    if (isLoading) return <Spinner />;
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>{" "}
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((state) => !state)}
                    disabled={booking.isPaid || isCheckingIn}
                    id={bookingId}
                >
                    <span>
                        I confirm that {guests.fullName} has paid the total
                        amount of {formatCurrency(totalPrice)}
                    </span>
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    $variation={
                        confirmPaid && !checkedInAlready
                            ? "primary"
                            : "secondary"
                    }
                    onClick={handleCheckin}
                    disabled={checkedInAlready || isCheckingIn}
                >
                    {checkedInAlready
                        ? "Checked in Already "
                        : `Check in booking #${bookingId}`}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
