import React from 'react';

export const FormGroup = ({ children }) => (
    <div className="row">{children}</div>
)

export const FormItem = ({ children, cols }) => (
    <div className={`col-sm-12 col-md-${cols}`}>{children}</div>
)