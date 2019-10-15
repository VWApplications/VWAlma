import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Sidebar from './Sidebar';

const MainContainer = styled.div`
    position: relative;
    top: 25px;
`;

const SidePanel = styled.div`
    position: relative;
    top: 8px;
    padding-left: 0;
    padding-right: 0;
    box-shadow: 1px 0px 8px #292C33;
`;

const PanelHeading = styled.div`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const H2 = styled.h2`
    margin-top: 10px;
`;

const PanelBody = styled.div`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

const Main = ({ children, navigation, menu, title }) => (
    <main>
        <Navbar />
        <Breadcrumb navigation={navigation} />

        <div className="row">
            <BreakLine />
            <SidePanel className="col-sm-2">
                <Sidebar menu={menu} />
            </SidePanel>

            <MainContainer className="col-sm-10">
                <PanelHeading className="panel-heading gradient">
                    <H2>{title}</H2>
                </PanelHeading>
                <PanelBody className="panel panel-default panel-content">
                    <div className="panel-body">{children}</div>
                </PanelBody>
            </MainContainer>
        </div>
    </main>
)

const Container = ({ children }) => (
    <div className="row">
      <div className="panel panel-default panel-content">
        <div className="panel-body">{children}</div>
      </div>
    </div>
)

const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} encType="multipart/form-data" noValidate>
        {children}
    </form>
)

const CustomFieldset = styled.fieldset`
    padding: 5px;
    margin: 10px;
    border: 1px solid #ccc;
    margin-bottom: 30px;

    > legend {
        margin-bottom: 0;
    }
`;

const Fieldset = ({ children, title }) => (
    <CustomFieldset>
        <legend style={{"paddingLeft": "5px"}}>{title}</legend><br />
        {children}
    </CustomFieldset>
)

const SubmitButton = ({ children, disabled }) => (
    <button type="submit" className="btn btn-primary center-block btn-block" disabled={disabled}>
        <i className="fa fa-send"></i> {children}
    </button>
)

const Button = ({ children, onClick, icon }) => (
    <button type="button" className="btn btn-primary center-block btn-block" onClick={onClick}>
        <i className={"fa " + icon}></i> {children}
    </button>
)

const Info = ({ children }) => (
    <div className="alert alert-info">{children}</div>
)

const StringToHtml = ({ children }) => (
    <div dangerouslySetInnerHTML={{__html: children}}></div>
)

const BreakLine = () => (<br />)
const Line = () => (<hr />)

export {
    Container, Form, Fieldset,
    BreakLine, Line, SubmitButton, Button,
    Main, Info, StringToHtml
};