import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
    outline: none !important;
`;

export const FinishSectionButton = ({ title, type, onClick }) => (
    <ButtonStyled type="button" className={`btn btn-${type} btn-lg pull-right`} onClick={onClick}>
        {title}
    </ButtonStyled>
)