import React from 'react';
import { FormGroup } from '../styles/fields';

export const InputField = field => {
	let formGroupClass = "";
	let iconClass = "";

	if (field.meta.touched) {
		if (field.meta.error) {
			formGroupClass = "has-error";
			iconClass = "glyphicon glyphicon-remove";
		} else {
			formGroupClass = "has-success";
			iconClass = "glyphicon glyphicon-ok";
		}
	}

	let labelCol = 2
	if (field.labelCol) labelCol = field.labelCol
	let fieldCol = 10
	if (field.fieldCol) fieldCol = field.fieldCol

	return (
		<FormGroup className={"row form-group " + formGroupClass + " has-feedback"}>
			<label className={`col-sm-${labelCol} control-label`} htmlFor={field.id}>
				<span className={field.labelClass}>{field.label}:</span>
			</label>
			<div className={`col-sm-${fieldCol}`}>
				<input
					{...field.input}
					name={field.name}
					type={field.type}
					placeholder={field.placeholder}
					className={field.className}
					id={field.id}
				/>
				<span className={"form-control-feedback " + iconClass}></span>
				<p className="text-danger">
					{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
				</p>
			</div>
		</FormGroup>
	)
}