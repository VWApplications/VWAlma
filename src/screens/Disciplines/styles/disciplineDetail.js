import React from 'react';
import styled from 'styled-components';
import user from 'asserts/img/user.png';

const H4 = styled.h4`
    margin-top: 20px;
`;

const IMG = styled.img`
    width: 60px;
`;

export const TeacherPhoto = ({ children, src=null }) => (
    <div className="media">
        <div className="media-body text-right">
            <H4>{ children }</H4>
        </div>
        <div className="media-right">
            <IMG src={src ? src : user} className="media-object img-circle img-thumbnail" alt="Teacher" />
        </div>
    </div>
);