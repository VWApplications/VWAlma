import React, { Component } from 'react';
import { Copyright, FooterStyled } from '../styles/footer';

class Footer extends Component {
    render() {
        return (
            <FooterStyled>
                <div className="row">
                    <div className="col-sm-9">
                        <Copyright>
                            <i className="fa fa-copyright"></i> Todos os direitos reservados.
                        </Copyright>

                        <Copyright>
                            Software desenvolvido e mantido pelo engenheiro 
                            <a className="no-decoration" href="https://www.linkedin.com/in/victorarnaud" target="_blank" rel="noopener noreferrer"> Victor Deon.</a>
                        </Copyright>
                    </div>
                </div>
            </FooterStyled>
        )
    }
}

export default Footer;