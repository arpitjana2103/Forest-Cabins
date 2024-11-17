import Button from "./styled-elements/Button";
import styled from "styled-components";

const StyledMenu = styled.div`
    position: relative;

    &:hover .dropdown {
        display: block;
    }

    &:hover > button {
        background-color: var(--color-grey-200);
    }
`;

const MenuButton = styled(Button).attrs({
    $variation: "secondary",
    $size: "medium",
    $type: "icon",
})`
    padding: 1rem;
    font-size: 2rem;
`;

const StyledItem = styled.button`
    display: flex;
    gap: 1rem;
    padding: 1.2rem 1rem;
    padding-right: 2rem;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    color: var(--color-grey-600);

    &:hover {
        background-color: var(--color-grey-200);
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Dropdown = styled.div.attrs({
    className: "dropdown",
})`
    display: none;
    position: absolute;
    top: 4.2rem;
    right: -0.3rem;
    box-shadow: var(--shadow-lg);
    background-color: var(--color-grey-0);
    width: fit-content;
    z-index: 1;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    border: 1px solid var(--color-grey-100);
`;

function Item({ children, onClick, disabled }) {
    return (
        <StyledItem onClick={onClick} disabled={disabled}>
            {children}
        </StyledItem>
    );
}

function Menu({ children, icon }) {
    return (
        <StyledMenu>
            <MenuButton>{icon}</MenuButton>
            <Dropdown>{children}</Dropdown>
        </StyledMenu>
    );
}

Menu.Item = Item;

export default Menu;
