import React from 'react';
import styled from 'styled-components';

export const SectionContainer = ({ children }) => (
    <div className="panel-group fix-row" id="accordion">{children}</div>
)

export const SectionPanel = ({ children }) => (
    <div className="panel panel-default">{children}</div>
)

const ButtonStyled = styled.button`
    outline: none !important;
`;

export const AddSectionButton = ({ onClick, opened=false }) => (
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

export const SectionPanelHeader = ({ children, id, statusTitle, statusType }) => (
    <div className="panel-heading">
        <PanelTitle className="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${id}`}>
                <span><i className="fa fa-puzzle-piece"></i> {children}</span>
                <Status className={`label label-${statusType} pull-right`}>{statusTitle}</Status>
            </a>
        </PanelTitle>
    </div>
)

export const SectionPanelBody = ({ children, id }) => (
    <div id={`collapse${id}`} className="panel-collapse collapse out">
        {children}
    </div>
)

export const SectionPanelContent = ({ children }) => (
    <div className="panel-body">{children}</div>
)

export const SectionPanelFooter = ({ isProvided, sendClick, editClick, deleteClick }) => (
    <div className="panel-footer">
        <div className="row">
            <div className="col-md-8">
                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button className="btn btn-primary" type="button" onClick={sendClick}>
                            {isProvided ?
                                <span><i className="fa fa-eye-slash"></i> Fechar Seção</span>
                            :
                                <span><i className="fa fa-eye"></i> Abrir Seção</span>
                            }
                        </button>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-primary" type="button" onClick={editClick}>
                            <i className="fa fa-edit"></i> Editar Seção
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button className="btn btn-danger" type="button" onClick={deleteClick}>
                            <i className="fa fa-trash"></i> Deletar Seção
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
