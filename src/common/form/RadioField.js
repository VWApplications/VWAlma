import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';

const CustomRadio = styled.div`
    input[type="radio"] {
        display: none;

        + label {
            position: relative;
            display: inline-block;
            padding-left: 1.5em;
            margin-right: 2em;
            cursor: pointer;
            line-height: 1em;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;

            :before, :after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 1em;
                height: 1em;
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
        }

        :checked + label:before {
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            box-shadow: inset 0 0 0 0.2em white, inset 0 0 0 1em green;
        }
    }

`;


export const RadioFields = ({ label, name, inline, question, inputs }) => {
    const alternatives = (
        <CustomRadio>
            {inputs.map((field, index) => {
                return (
                    <div key={index}>
                        <Field name={name} component={"input"} type="radio" value={field.value} id={index} />
                        <label htmlFor={index}>{field.title}</label>
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