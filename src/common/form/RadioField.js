import React from 'react';
import { Field } from 'react-final-form';
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

const RadioBlock = styled.div`
    left: 20px;
`;

const RadioField = field => {
    const alternatives = (
        <CustomRadio>
            <div style={{"marginBottom": "15px"}}>
                <input {...field.input} id={field.id} />
                <Label htmlFor={field.id}><P>{field.label}</P></Label>
            </div>
        </CustomRadio>
    )

    const inlines = (
        <label className="radio-inline">
            <input {...field.input} /> {field.label}
        </label>
    );

    const block = (
        <RadioBlock className="radio">
            <input {...field.input} /> {field.label}
        </RadioBlock>
    )

    return field.question ? alternatives : field.inline ? inlines : block;
}

export const RadioFields = ({ label, name, options, inline=false, question=false }) => {
    function constructor() {
        return options.map((option, index) => {
            let fieldName = name;
            if (question)
                fieldName = name + "_" + option.id;

            return (
                <Field
                    key={index}
                    component={RadioField}
                    type="radio"
                    id={index}
                    value={option.value}
                    label={option.label}
                    inline={inline}
                    question={question}
                    name={fieldName}
                />
            )
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <label>{label}</label>
                </div>
                <div className="col-sm-12">
                    {constructor()}
                </div>
            </div>
        </React.Fragment>
    )
}