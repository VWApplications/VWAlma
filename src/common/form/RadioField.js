import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';

const RadioBlock = styled.div`
    left: 20px;
`;

const RadioField = field => {
    const inlines = (
        <label className="radio-inline">
            <input
                name={field.input.name}
                type={field.input.type}
                value={field.input.value}
                onFocus={field.input.onFocus}
                onBlur={field.input.onBlur}
                onChange={field.input.onChange}
            />
            {field.label}
        </label>
    );

    const block = (
        <RadioBlock className="radio">
            <input
                name={field.input.name}
                type={field.input.type}
                value={field.input.value}
                onFocus={field.input.onFocus}
                onBlur={field.input.onBlur}
                onChange={field.input.onChange}
            />
            {field.label}
        </RadioBlock>
    )

    return field.inline ? inlines : block;
}

export const RadioFields = ({ label, name, options, inline=false }) => {
    function constructor() {
        return options.map((option, index) => {
            return (
                <Field
                    key={index}
                    component={RadioField}
                    type="radio"
                    id={index}
                    value={option.value}
                    label={option.label}
                    inline={inline}
                    name={name}
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