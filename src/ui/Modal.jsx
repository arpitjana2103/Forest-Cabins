import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import Heading from "./Heading";
import { createPortal } from "react-dom";
import {
    cloneElement,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

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

const ModalContext = createContext();

function Modal({ children }) {
    const [content, setContent] = useState("");

    const openContent = setContent;
    const closeContent = () => setContent("");

    return (
        <ModalContext.Provider
            value={{
                content: content,
                closeContent: closeContent,
                openContent: openContent,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, content }) {
    const { openContent } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => openContent(content),
    });
}

function Window({ children, content: windowContent, title }) {
    const ref = useRef();
    const { content, closeContent } = useContext(ModalContext);

    useEffect(
        function () {
            function handleClick(e) {
                if (ref.current && e.target === ref.current) closeContent();
            }
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        },
        [closeContent]
    );

    if (content !== windowContent) return null;
    return createPortal(
        <Overlay ref={ref}>
            <StyledModal>
                <Heading className="modal-heading" type="secondary" as="h2">
                    {title}
                </Heading>
                <Button onClick={closeContent}>
                    <HiXMark />
                </Button>
                <div className="children-container">
                    <div className="children">
                        {cloneElement(children, { onCloseModal: closeContent })}
                    </div>
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
