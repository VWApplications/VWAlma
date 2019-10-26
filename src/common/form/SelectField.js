import React from 'react';
import { Field } from 'redux-form';

const SelectGroup = ({ children, label, color="white" }) => (
    <div className="row">
        <div className="col-sm-12 form-group">
            <label htmlFor="selectID" className={color}>{label}:</label>
            {children}
        </div>
    </div>
)

export const SelectField = field => (
    <SelectGroup label={field.label} color={field.color}>
        <Field id="selectID" autoFocus name={field.name} component="select" className={"form-control " + field.className} onChange={field.onChange}>
            {field.empty ? <option value={null}></option> : null}
            {field.options.map((option, index) => {
                return <option key={index} value={option.value}>{option.title}</option>
            })}
        </Field>
    </SelectGroup>
)