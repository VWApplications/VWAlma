import React from 'react';
import { Field } from 'redux-form';

export const RadioFields = ({ label, name, inline, inputs }) => (
    <div>
        <label>{label}</label>
        {inline ?
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
        : 
            inputs.map((field, index) => {
                return (
                    <div key={index} className="radio">
                        <label className="radio-inline">
                            <Field name={name} component={"input"} type="radio" value={field.value} />
                            {field.title}
                        </label>
                    </div>
                )
            })
        }
    </div>
)