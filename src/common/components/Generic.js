import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Sidebar from './Sidebar';

const MainContainer = styled.div`
    position: relative;
    top: 25px;
`;

const PanelBody = styled.div`
    padding-top: 0;
`;

const Main = ({ children, navigation, menu }) => (
    <main>
        <Navbar />
        <Breadcrumb navigation={navigation} />

        <div className="row">
            <BreakLine />
            <div className="col-sm-2" style={{"paddingLeft": 0, "paddingRight": 0}}>
                <Sidebar menu={menu} />
            </div>

            <MainContainer className="col-sm-10">
                <div className="panel panel-default panel-content">
                    <PanelBody className="panel-body">{children}</PanelBody>
                </div>
            </MainContainer>
        </div>
    </main>
)

const LineStyled = styled.hr`
    margin-top: 10px;
`;

const H1 = styled.h1`
    margin-top: 10px;
`;

const PageHeader = ({ children }) => (
    <div>
        <H1>{children}</H1>
        <LineStyled />
    </div>
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

const BreakLine = () => (<br />)
const Line = () => (<hr />)

export {
    PageHeader, Container, Form, Fieldset,
    BreakLine, Line, SubmitButton, Button,
    Main, Info
};