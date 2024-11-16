import styled from "styled-components";
import Button from "./styled-elements/Button";
import Heading from "./styled-elements/Heading";

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0.5rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
        <StyledConfirmDelete>
            <p>
                {resourceName} will be deleted permanently ! This action cannot
                be undone.
            </p>

            <div>
                <Button
                    onClick={onCloseModal}
                    $variation="secondary"
                    disabled={disabled}
                >
                    Cancel
                </Button>
                <Button
                    variation="danger"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    {disabled ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
