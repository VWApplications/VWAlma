import React from 'react';
import { Field } from 'react-final-form';

export const Error = ({ name }) => (
    <div className="col-sm-12">
        <Field name={name} subscription={{ error: true, touched: true }}>
            {({ meta: { error, touched } }) =>
                error && touched ? <p className="text-danger">{error}</p> : null
            }
        </Field>
    </div>
)