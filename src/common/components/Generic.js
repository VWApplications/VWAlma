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
    background-image: linear-gradient(#383c44, #292C33);
    color: white;
`;

const H2 = styled.h2`
    margin-top: 10px;
`;

const PanelBody = styled.div`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

const Main = ({ children, navigation, menu, title, icon, rightComponent=null }) => (
    <main>
        <Navbar />
        <Breadcrumb navigation={navigation} />

        <div className="row">
            <BreakLine />
            <SidePanel className="col-sm-2">
                <Sidebar menu={menu} />
            </SidePanel>

            <MainContainer className="col-sm-10">
                <PanelHeading className="panel-heading">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <H2><i className={`fa ${icon}`}></i> {title}</H2>
                        </div>
                        <div className="col-12 col-md-6 pull-right">
                            {rightComponent}
                        </div>
                    </div>
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

const FormStyled = ({ children, onSubmit }) => (
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

const ButtonField = styled.button`
    :hover {
        text-decoration: none;
    }
`;

const Fieldset = ({ children, title, array=null }) => (
    <CustomFieldset>
        <legend style={{"paddingLeft": "5px"}}>
            {title} {array ?
                <ButtonField
                    className="btn btn-link pull-right"
                    type="button"
                    onClick={() => array.push({is_correct: false, title: ""})}>
                        Adicionar
                    </ButtonField>
            : null}
        </legend><br />
        {children}
    </CustomFieldset>
)

const SubmitButton = ({ children, disabled }) => (
    <button type="submit" className="btn btn-primary center-block btn-block" disabled={disabled}>
        <i className="fa fa-send"></i> {children}
    </button>
)

const ResetButton = ({ children, reset }) => (
    <button type="button" className="btn btn-danger center-block btn-block" onClick={reset}>
        <i className="fa fa-eraser"></i> {children}
    </button>
)

const FormSubmitButtons = ({ reset, disabled }) => (
    <div className="row">
        <div className="col-sm-6">
            <SubmitButton disabled={disabled}>Enviar</SubmitButton>
        </div>
        <div className="col-sm-6">
            <ResetButton reset={reset}>Resetar Formulário</ResetButton>
        </div>
    </div>
)

const Button = ({ children, onClick, icon }) => (
    <button type="button" className="btn btn-primary center-block btn-block" onClick={onClick}>
        <i className={"fa " + icon}></i> {children}
    </button>
)

const Info = ({ children }) => (
    <div className="alert alert-info" style={{"marginTop": "10px"}}>{children}</div>
)

const StringToHtml = ({ children, resume=false }) => {
    if (resume) {
        try {
            let content = children.match(/<h\d>.+<\/h\d>|<p>.+<\/p>/gm).slice(0, 2).join("\n");
            content = content.replace("</p>", "...</p>")
            return <div dangerouslySetInnerHTML={{__html: content}}></div>
        } catch(e) {
            return <div dangerouslySetInnerHTML={{__html: children}}></div>
        }
    }

    return <div dangerouslySetInnerHTML={{__html: children}}></div>
}

const ButtonLink = styled.button`
    color: black;
    :hover, :focus {
        color: black;
        text-decoration: none;
    }
`;

const ActionsButton = ({ children, actions }) => (
    <div className="btn-group pull-right">
        <button type="button" className="btn btn-primary gradient dropdown-toggle" data-toggle="dropdown">
            {children} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
            {actions.map((action, index) => (
                <li key={index}>
                    <ButtonLink className="btn btn-link" onClick={action.run}>
                        <i className={"fa " + action.icon}></i> {action.title}
                    </ButtonLink>
                </li>
            ))}
        </ul>
    </div>
)

const Label = ({ children, type="primary gradient" }) => (<span className={"label label-" + type}>{children}</span>)

const BreakLine = () => (<br />)
const Line = () => (<hr />)

const Json = ({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>

export {
    Container, FormStyled, Fieldset,
    BreakLine, Line, SubmitButton, Button,
    Main, Info, StringToHtml, ActionsButton,
    Label, Json, ResetButton, FormSubmitButtons
};