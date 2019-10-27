import React from 'react';

export const SelectField = field => (
    <div>
        <label htmlFor="selectID" className={field.color}>{field.label}:</label>
        <select {...field.input} className={"form-control " + field.className} id="selectID">
            {field.empty ? <option value={null}></option> : null}
            {field.options.map((option, index) => {
                return <option key={index} value={option.value}>{option.title}</option>
            })}
        </select>
        <p className="text-danger">
            {field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
        </p>
    </div>
)