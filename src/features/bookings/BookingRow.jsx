import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menu from "../../ui/Menu";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiDotsVertical, HiEye } from "react-icons/hi";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
};

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const { isDeleting, deleteBooking } = useDeleteBooking();

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Menu icon={<HiDotsVertical />}>
                <Menu.Item onClick={() => navigate(`/booking/${bookingId}`)}>
                    <span>
                        <HiEye />
                    </span>
                    <span>See Details</span>
                </Menu.Item>
                {status === "unconfirmed" && (
                    <Menu.Item
                        onClick={() => navigate(`/checking/${bookingId}`)}
                    >
                        <span>
                            <HiArrowDownOnSquare />
                        </span>
                        <span>Check in</span>
                    </Menu.Item>
                )}
                {status === "checked-in" && (
                    <Menu.Item
                        disabled={isCheckingOut}
                        onClick={() => {
                            checkout(bookingId);
                        }}
                    >
                        <span>
                            <HiArrowUpOnSquare />
                        </span>
                        <span>Check out</span>
                    </Menu.Item>
                )}
                <Modal>
                    <Modal.Open content="booking-delete">
                        <Menu.Item>
                            <span>
                                <HiTrash />
                            </span>
                            <span>Delete</span>
                        </Menu.Item>
                    </Modal.Open>
                    <Modal.Window
                        content="booking-delete"
                        title={`Delete Booking #${bookingId}`}
                    >
                        <ConfirmDelete
                            resourceName={`Booking - #${bookingId}`}
                            onConfirm={() => deleteBooking(bookingId)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
            </Menu>
        </Table.Row>
    );
}

export default BookingRow;
