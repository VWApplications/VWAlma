import React from 'react';
import styled from 'styled-components';

const PanelStyled = styled.div`
    margin-top: 20px;
`;

export const Panel = ({ children }) => (
    <PanelStyled className="row">
        <div className="col-sm-12">
            <div className="panel-group" id="accordion">
                {children}
            </div>
        </div>
    </PanelStyled>
)

export const PanelContainer = ({ children }) => (
    <div className="panel panel-default">{children}</div>
)

const PanelHeading = styled.div`
    background-color: #f5f5f58f !important;
`;

const PanelLink = styled.a`
    :hover, :focus {
        text-decoration: none;
    }
`;

export const PanelHeader = ({ children, classroom, id }) => (
    <PanelHeading className="panel-heading">
        <h4 className="panel-title">
            <PanelLink data-toggle="collapse" data-parent="#accordion" href={"#" + id}>
                <span>
                    <i className="fa fa-book"></i> {children}
                </span>
                <span className="pull-right">
                    {classroom} <i className="fa fa-slideshare"></i>
                </span>
            </PanelLink>
        </h4>
    </PanelHeading>
)

export const PanelBody = ({ children, id }) => (
    <div id={id} className="panel-collapse collapse out">{children}</div>
)

export const CollapseBody = ({ children, qtdStudents, totalStudents }) => (
    <div className="panel-body">
        <div className="row">
            <div className="col-sm-11">
                <div className="text-justify">
                    {children}
                </div>
            </div>
            <div className="col-sm-1">
                <span className="label label-primary">
                    {qtdStudents}/{totalStudents}
                </span>
            </div>
        </div>
    </div>
)

const PanelFooter = styled.div`
    border-top: 1px solid #dedddd !important;
`;

export const CollapseFooter = ({ children }) => (
    <PanelFooter className="panel-footer">
        <div className="row">{children}</div>
    </PanelFooter>
)

export const FooterInfo = ({ teacher, course }) => (
    <div className="col-md-6 col-sm-6 col-xs-12">
        <span><b>Professor</b>: {teacher}</span>
        <br />
        <span><b>Curso</b>: {course}</span>
    </div>
)

export const FooterPassword = ({ children }) => (
    <div className="col-md-6 col-sm-6 col-xs-12">
        {children}
    </div>
)

export const InputGroup = ({ children }) => (
    <div className="input-group">{children}</div>
)

export const SubmitButton = ({ disabled }) => (
    <div className="input-group-btn">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
            <i className="fa fa-user-plus"></i>
        </button>
    </div>
)