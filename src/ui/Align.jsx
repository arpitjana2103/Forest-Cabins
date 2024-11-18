import styled, { css } from "styled-components";

const Align = styled.div`
    display: flex;

    ${(props) =>
        props.type === "row" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}

    ${(props) =>
        props.type === "col" &&
        css`
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        `}
`;

Align.defaultProps = {
    type: "row",
};

export default Align;
