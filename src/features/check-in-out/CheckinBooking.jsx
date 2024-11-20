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
import useSettings from "../settings/useSettings";

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
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { isLoading: isLoadingSettings, settings = {} } = useSettings();

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
    const checkedOutAlready = status === "checked-out";
    const totalBreakFastPrice = settings?.breakfastPrice * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return toast.error("Payment not confirmed !");
        if (addBreakfast) {
            checkin({
                bookingID: bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extraPrice: totalBreakFastPrice,
                    totalPrice: totalPrice + totalBreakFastPrice,
                },
            });
        } else {
            checkin({
                bookingID: bookingId,
                breakfast: {},
            });
        }
    }

    if (isLoading || isLoadingSettings) return <Spinner />;
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

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((state) => !state);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        <span>
                            Want to add breakfast of{" "}
                            {formatCurrency(totalBreakFastPrice)} ({" "}
                            {formatCurrency(settings.breakfastPrice)} x{" "}
                            {numGuests} ) ?
                        </span>
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((state) => !state)}
                    disabled={
                        (booking.isPaid && booking.hasBreakfast) || isCheckingIn
                    }
                    id="isPaid"
                >
                    <span>
                        I confirm that {guests.fullName} has paid the total
                        amount of{" "}
                        {addBreakfast
                            ? `${formatCurrency(
                                  totalPrice + totalBreakFastPrice
                              )} ( ${formatCurrency(
                                  totalPrice
                              )} + ${formatCurrency(totalBreakFastPrice)} )`
                            : formatCurrency(totalPrice)}
                    </span>
                </Checkbox>
            </Box>

            <ButtonGroup>
                {!checkedInAlready && !checkedOutAlready && (
                    <Button
                        $variation={
                            confirmPaid && !checkedInAlready
                                ? "primary"
                                : "secondary"
                        }
                        onClick={handleCheckin}
                        disabled={isCheckingIn}
                    >
                        Check in booking #{bookingId}
                    </Button>
                )}
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
