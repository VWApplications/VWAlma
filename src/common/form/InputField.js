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

	return (
		<FormGroup className={"row form-group " + formGroupClass + " has-feedback"}>
			<label className="col-sm-2 control-label" htmlFor={field.id}>
				{field.label}:
			</label>
			<div className="col-sm-10">
				<input {...field.input} {...field} className={field.className} id={field.id} />
				<span className={"form-control-feedback " + iconClass}></span>
				<p className="text-danger">
					{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
				</p>
			</div>
		</FormGroup>
	)
}