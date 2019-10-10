import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

const Group = styled.div`
    margin-top: 5px;
`;

const SelectGroup = ({ children, label }) => (
    <Group>
        <div className="form-group">
            <label htmlFor="selectID" className="white">{label}</label>
            {children}
        </div>
    </Group>
)

export const SelectField = field => (
    <SelectGroup label={field.label}>
        <Field id="selectID" autoFocus name={field.name} component="select" className={"form-control " + field.className}>
            {field.options.map((option, index) => {
                return <option key={index} value={option.value}>{option.title}</option>
            })}
        </Field>
    </SelectGroup>
)