import React, { Component } from 'react';
import { ParallaxStyled, ParallaxHeader } from '../styles/parallax';

class Parallax extends Component {
    render() {
        return (
            <ParallaxStyled id="home">
                <div className="row">
                    <div className="col-sm-12">
                        <ParallaxHeader>
                            ALMA Plataform<br />
                            Active Learning Methodology Automation Plataform
                        </ParallaxHeader>
                    </div>
                </div>
            </ParallaxStyled>
        )
    }
}

export default Parallax;