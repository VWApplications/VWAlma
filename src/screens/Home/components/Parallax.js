import React, { Component } from 'react';
import { ParallaxContainer, ParallaxHeader, ParallaxStyled, BreakLine } from '../styles/parallax';

class Parallax extends Component {
    render() {
        return (
            <ParallaxContainer id="home">
                <ParallaxStyled>
                    <ParallaxHeader>
                        ALMA Plataform<BreakLine />
                        Active Learning Methodology Automation Plataform
                    </ParallaxHeader>
                </ParallaxStyled>
            </ParallaxContainer>
        )
    }
}

export default Parallax;