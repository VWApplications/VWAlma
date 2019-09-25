import React from 'react';
import styled from 'styled-components';
import logo from 'asserts/img/logo.png';

export const Space = styled.div`
    margin-top: 51px;
`;

const NavbarToogle = styled.button`
    :focus {
        background-color: #263238 !important;
        border-color: #263238 !important;
    }

    :hover {
        background-color: #263238 !important;
        border-color: #263238 !important;
    }
`;

export const CollapseButton = () => (
    <NavbarToogle type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapse-navbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
    </NavbarToogle>
)

export const NavbarStyled = styled.nav`
    margin-bottom: 0px;
    background-color: #263238;
`;

const NavbarLinkStyled = styled.a`
    color: #cfd8dc !important;

    :hover {
        color: white !important;
    }
`;

export const NavbarLink = ({ children, icon, link }) => (
    <li>
        <NavbarLinkStyled href={link} className="navbar-link">
            <i className={"fa " + icon}></i> {children}
        </NavbarLinkStyled>
    </li>
)

export const NavbarUL = styled.ul`
    :active > a {
        background-color: #1f272b;

        :hover {
            background-color: #1f272b;
        }
    }
`;

const ImgNavbar = styled.img`
    max-width: 40px;
`;

const NavbarMedia = styled.div`
    position: relative;
    bottom: 11px;
    width: 300px;

    @media screen and (max-width: 480px) {
        width: 245px;
    }
`;

const NavbarMediaBody = styled.div`
    vertical-align: middle;
`;

export const NavbarBrand = ({ children, functionRedirect }) => (
    <NavbarLinkStyled className="navbar-brand navbar-link on-click-link" onClick={functionRedirect}>
        <NavbarMedia className="media">
            <div className="media-left">
                <ImgNavbar src={logo} className="img-responsive img-navbar" alt="Logo" />
            </div>
            <NavbarMediaBody className="media-body">{children}</NavbarMediaBody>
        </NavbarMedia>
    </NavbarLinkStyled>
)