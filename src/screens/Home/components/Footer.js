import React, { Component } from 'react';
import { Copyright, FooterStyled, Container, Icon, Link } from '../styles/footer';

class Footer extends Component {
    render() {
        return (
            <FooterStyled>
                <Container>
                        <Copyright>
                            <Icon src="fa-copyright" /> Todos os direitos reservados.
                        </Copyright>

                        <Copyright>
                            Software desenvolvido e mantido pelo engenheiro 
                            <Link href="https://victordeon.github.io/portfolio/"> Victor Deon.</Link>
                        </Copyright>
                </Container>
            </FooterStyled>
        )
    }
}

export default Footer;