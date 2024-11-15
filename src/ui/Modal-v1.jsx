import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import Heading from "./styled-elements/Heading";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);

    transition: all 0.5s;

    & .children {
        padding-right: 2rem;
        padding-top: 2.5rem;
        max-height: calc(100vh - 15rem);
        overflow-y: scroll;
    }

    & .children-container {
        padding: 2.5rem;
        padding-top: 0rem;
    }

    & > .modal-heading {
        padding: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-grey-300);
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(1.5px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.8rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

export default function Modal({ children, onClose, title }) {
    return createPortal(
        <Overlay>
            <StyledModal>
                <Heading className="modal-heading" type="secondary" as="h2">
                    {title}
                </Heading>
                <Button onClick={onClose}>
                    <HiXMark />
                </Button>
                <div className="children-container">
                    <div className="children">{children}</div>
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}
