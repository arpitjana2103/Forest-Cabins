import styled from "styled-components";
import CreateCabinForm from "./CabinForm";
import useDeleteCabin from "./useDeleteCabin";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { useCreateDuplicateCabin } from "./useCreateCabin";
import Menu from "../../ui/Menu";
import { HiDotsVertical } from "react-icons/hi";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateDuplicateCabin();

    return (
        <>
            <Table.Row>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity}</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                <Discount>
                    {!discount ? "---" : formatCurrency(discount)}
                </Discount>
                <Menu icon={<HiDotsVertical />}>
                    <Menu.Item
                        onClick={() => createCabin(cabin)}
                        disabled={isCreating}
                    >
                        <span>
                            <HiSquare2Stack />
                        </span>
                        <span>Duplicate</span>
                    </Menu.Item>

                    <Modal>
                        <Modal.Open content="cabin-edit">
                            <Menu.Item>
                                <span>
                                    <HiPencil />
                                </span>
                                <span>Edit</span>
                            </Menu.Item>
                        </Modal.Open>
                        <Modal.Window
                            content="cabin-edit"
                            title={`Update Cabin-${name}`}
                        >
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                    </Modal>

                    <Modal>
                        <Modal.Open content="delete-cabin">
                            <Menu.Item>
                                <span>
                                    <HiTrash />
                                </span>
                                <span>Delete</span>
                            </Menu.Item>
                        </Modal.Open>
                        <Modal.Window
                            content="delete-cabin"
                            title={`Delete Cabin-${name} ?`}
                        >
                            <ConfirmDelete
                                resourceName={`Cabin - ${name}`}
                                onConfirm={() => deleteCabin({ id, image })}
                                disabled={isDeleting}
                            />
                        </Modal.Window>
                    </Modal>
                </Menu>
            </Table.Row>
        </>
    );
}

export default CabinRow;
