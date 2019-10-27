import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { P } from '../styles/fields';

const CustomRadio = styled.div`
    input[type="radio"] {
        display: none;

        :checked + label:before {
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            box-shadow: inset 0 0 0 0.2em white, inset 0 0 0 1em green;
        }
    }
`;

const Label = styled.label`
    position: relative;
    display: inline-block;
    padding-left: 30px;
    margin-right: 1em;
    padding-top: 2px;
    cursor: pointer;
    line-height: 1em;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    :before, :after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        text-align: center;
        color: black;
        font-family: Times;
        border-radius: 50%;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    :before {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        box-shadow: inset 0 0 0 0.2em white, inset 0 0 0 1em white;
        border: 1px solid gray;
    }

    :hover:before {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        box-shadow: inset 0 0 0 0.3em white, inset 0 0 0 1em #c6c6c6;
    }
`;

export const RadioFields = ({ label, name, inline, question, inputs }) => {
    const alternatives = (
        <CustomRadio>
            {inputs.map((field, index) => {
                return (
                    <div key={index} style={{"marginBottom": "15px"}}>
                        <Field name={name} component={"input"} type="radio" value={field.value} id={"input_" + index} />
                        <Label htmlFor={"input_" + index}><P>{field.title}</P></Label>
                    </div>
                )
            })}
        </CustomRadio>
    )

    const inlines = (
        <div className="radio">
            {inputs.map((field, index) => {
                return (
                    <label key={index} className="radio-inline">
                        <Field name={name} component={"input"} type="radio" value={field.value} />
                        {field.title}
                    </label>
                )
            })}
        </div>
    )

    const block = inputs.map((field, index) => (
        <div key={index} className="radio">
            <label className="radio-inline">
                <Field name={name} component={"input"} type="radio" value={field.value} />
                {field.title}
            </label>
        </div>
    ));

    return (
        <div className="row">
            <div className="col-sm-12">
                {label ? <label>{label}</label> : null}
                {question ? alternatives : inline ? inlines : block}
            </div>
        </div>
    )
}