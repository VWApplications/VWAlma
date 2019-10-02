import React from 'react';
import styled from 'styled-components';
import parallax from '../../../asserts/img/parallax.jpg';

export const ParallaxContainer = styled.div`
    background-image: url(${parallax});
    height: 570px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const ParallaxStyled = ({ children }) => (
    <div className="row"><div className="col-sm-12">{children}</div></div>
)

export const ParallaxHeader = styled.h1`
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px black;
    position: relative;
    box-shadow: 5px 5px 5px white;
    top: 200px;
    font-size: 45px;
`;

export const BreakLine = () => (<br />)