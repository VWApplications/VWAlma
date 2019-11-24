import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import "../../asserts/css/datetime.css";

export const DateTimeField = field => {
    return (
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor={field.id}><span>{field.label}:</span></label>
            </div>
            <div className="col-sm-10">
                <DateTimePicker
                    name={field.input.name}
                    onChange={field.input.onChange}
                    value={field.input.value}
                    className={field.className}
                    minDate={new Date()}
                    id={field.id}
                />
                <p className="text-danger">
                    {field.meta.error}
                </p>
            </div>
        </div>
    )
}