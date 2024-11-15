import styled from "styled-components";

const StyledFormError = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
    grid-column: 2 / -1;
`;

export default function FormError({ error }) {
    if (!error) return null;
    return <StyledFormError>{error}</StyledFormError>;
}
