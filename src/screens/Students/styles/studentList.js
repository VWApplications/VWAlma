import React from 'react';
import styled from 'styled-components';
import user from 'asserts/img/user.png';
import { TEACHER, ADMIN } from 'common/constants';

export const StudentContainer = ({ children }) => (
    <div className="row">{children}</div>
)

const MediaStudents = styled.div`
    margin-top: 20px !important;
`;

export const StudentBox = ({ children, col }) => (
    <div className={`col-sm-${col}`}>
        <MediaStudents className="media">{children}</MediaStudents>
    </div>
)

const MediaObject = styled.img`
    width: 60px;
    border: 2px solid #31343C;
`;

const ChangeStudentStatusLink = styled.button`
    background:none!important;
    color:inherit;
    border:none;
    padding:0 !important;
    margin-top: 5px;
    font: inherit;
    cursor: pointer;

    :focus {
        outline: none !important;
    }
`;

export const StudentHeader = ({ children, onClick, src }) => (
    <div className="media-left">
        <MediaObject src={src ? src : user} className="media-object img-circle" alt="Foto" />

        <ChangeStudentStatusLink type="button" className="center-block" onClick={onClick}>
            {children}
        </ChangeStudentStatusLink>
    </div>
)

const RemoveStudentButton = styled.button`
    :focus {
        outline: none !important;
    }
`;

const ID = styled.p`
    margin: 0;
`;

export const StudentBody = ({ children, email, onClose, id, user }) => (
    <div className="media-body">
        <h4 className="media-heading">
            {children}

            {user.permission === TEACHER || user.permission === ADMIN ?
                <span className="pull-right">
                    <RemoveStudentButton type="button" className="close" onClick={onClose}>
                        <i className="fa fa-close"></i>
                    </RemoveStudentButton>
                </span>
            : null}
        </h4>

        <ID>{id}</ID>
        <p>{email}</p>
    </div>
)