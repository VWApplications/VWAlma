import React from 'react';
import styled from 'styled-components';
import user from 'asserts/img/user.png';
import { TEACHER, ADMIN } from 'common/constants';

export const GroupContainer = ({ children }) => (
    <div className="panel-group fix-row" id="accordion">{children}</div>
)

export const GroupPanel = ({ children }) => (
    <div className="panel panel-default">{children}</div>
)

const ButtonStyled = styled.button`
    outline: none !important;
`;

export const AddGroupButton = ({ onClick, opened=false }) => (
    <ButtonStyled type="button" className="btn btn-primary btn-lg pull-right" onClick={onClick}>
        {opened ? "Remover Formulário" : "Adicionar Formulário"}
    </ButtonStyled>
)

const PanelTitle = styled.h4`
    a:hover, a:focus {
        text-decoration: none;
    }
`;

const Status = styled.span`
    margin-right: 10px;
`;

export const GroupPanelHeader = ({ children, qtdStudent, totalStudent, id, statusTitle, statusType }) => (
    <div className="panel-heading">
        <PanelTitle className="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${id}`}>
                <span><i className="fa fa-chevron-right"></i> {children}</span>
                <span className="label label-primary pull-right">{qtdStudent}/{totalStudent}</span>
                <Status className={`label label-${statusType} pull-right`}>{statusTitle}</Status>
            </a>
        </PanelTitle>
    </div>
)

export const GroupPanelBody = ({ children, id }) => (
    <div id={`collapse${id}`} className="panel-collapse collapse out">
        {children}
    </div>
)

export const GroupPanelContent = ({ children }) => (
    <div className="panel-body">{children}</div>
)

export const GroupPanelFooter = ({ isProvided, sendClick, editClick, deleteClick }) => (
    <div className="panel-footer">
        <div className="row">
            <div className="col-md-8">
                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button className="btn btn-primary" type="button" onClick={sendClick}>
                            {isProvided ?
                                <span><i className="fa fa-eye-slash"></i> Esconder Grupo</span>
                            :
                                <span><i className="fa fa-eye"></i> Mostrar Grupo</span>
                            }
                        </button>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-primary" type="button" onClick={editClick}>
                            <i className="fa fa-edit"></i> Editar Grupo
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button className="btn btn-danger" type="button" onClick={deleteClick}>
                            <i className="fa fa-trash"></i> Deletar Grupo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

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

export const StudentHeader = ({ src }) => (
    <div className="media-left">
        <MediaObject src={src ? src : user} className="media-object img-circle" alt="Foto" />
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