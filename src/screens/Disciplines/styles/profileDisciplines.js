import React from 'react';
import styled from 'styled-components';

export const Main = ({ children }) => (
    <div className="row">{children}</div>
);

export const TabList = ({ children }) => (
    <ul className="nav nav-tabs" id="filter">
        {children}
    </ul>
)

export const Tab = ({ title, children, link, className, onClick }) => (
    <li className={className}>
        <a href={link} data-toggle="tab" data-intro={children} onClick={onClick}>
            {title}
        </a>
    </li>
)

export const Accordion = ({ children }) => (
    <div className="tab-content">
        <div id="all" className="tab-pane fade in active">
            <div className="panel-group" id="accordion">
                {children}
            </div>
        </div>
    </div>
)

export const Panel = ({ children }) => (
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
    <div className="col-md-9 col-sm-8 col-xs-12">
        <span><b>Professor</b>: {teacher}</span>
        <br />
        <span><b>Curso</b>:{course}</span>
    </div>
)

export const FooterButtonGroup = ({ children }) => (
    <div className="col-md-3 col-sm-4 col-xs-12">
        <div className="btn-group btn-group-justified">{children}</div>
    </div>
)

export const FooterButton = ({ icon, type, title, onClick }) => (
    <div className="btn-group">
        <button
            type="button"
            onClick={onClick}
            className={"btn-class btn btn-" + type}
            data-toggle="tooltip"
            data-placement="top"
            title={title}>
            <i className={"fa " + icon}></i>
        </button>
    </div>
)