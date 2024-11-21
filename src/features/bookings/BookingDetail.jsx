import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack.hook";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { isLoading, booking = {} } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { isDeleting, deleteBooking } = useDeleteBooking();
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const { id, status } = booking;
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checking/${id}`)}>
                        <span>Check in</span>
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        disabled={isCheckingOut}
                        onClick={() => checkout(id)}
                    >
                        {isCheckingOut ? "Checking out..." : "Check out"}
                    </Button>
                )}
                <Modal>
                    <Modal.Open content="delete-booking">
                        <Button $variation="danger">Delete</Button>
                    </Modal.Open>
                    <Modal.Window
                        content="delete-booking"
                        title={`Delete Booking-#${id}`}
                    >
                        <ConfirmDelete
                            resourceName={`Booking - #${id}`}
                            onConfirm={() => deleteBooking(id)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
