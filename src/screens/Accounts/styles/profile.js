import React from 'react';
import styled from 'styled-components';
import user from 'asserts/img/user.png';

export const Information = ({ children }) => (
    <div className="row">{children}</div>
)

const ImageSize = styled.img`
    height: 225px;
    width: 250px;
    object-fit: cover;
`;

export const UserImage = ({ src }) => (
    <div className="col-sm-3">
        {src ?
            <ImageSize src={src} className="img-rounded img-responsive cente-block" alt="User" />
        :        
            <ImageSize src={user} className="img-rounded img-responsive cente-block" alt="User" />
        }
    </div>
)

const Name = styled.h2`
    color: white;
    margin-top: 10px;
`;

export const UserPanel = ({ children, type, name }) => (
    <div className="col-sm-9">
        <div className="row">
            <span className="label label-primary pull-left">{type}</span>
        </div>

        <Name>{name}</Name>
        <table className="lighten-blue-grey">
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
)

const Info = styled.td`
    text-align: left;
    padding: 8px;
`;

export const UserInfo = ({ icon, label, children }) => (
    <tr>
        <Info>
            <i className={"fa " + icon}></i> <b>{label}</b>:
        </Info>
        <Info>{children}</Info>
    </tr>
)

export const Status = ({ children }) => (
    <div className="row">
        <div className="col-sm-12">
            {children}
        </div>
    </div>
)

export const LastLogin = ({ children }) => (
    <p className="lighten-blue-grey pull-left">
        <i className="fa fa-history"></i> <b>Último login</b>: {children}
    </p>
)

export const UpdatedAt = ({ children }) => (
    <p className="lighten-blue-grey pull-right">{children}</p>
)