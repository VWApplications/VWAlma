import React from 'react';

export const SimpleInputField = field => (
    <input {...field.input} {...field} className={(field.meta.touched && field.meta.error) ? field.className + " error-field" : field.className} />
)