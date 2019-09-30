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

export const UserPanel = ({ children, type, name, updateAt }) => (
    <div className="col-sm-9">
        <div className="row">
            <span className="label label-primary pull-left">{type}</span>
            <span className="lighten-blue-grey pull-right">{updateAt}</span>
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