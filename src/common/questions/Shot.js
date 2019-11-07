import React from 'react';
import { FormGroup } from '../styles/fields';

export default field => {
	let formGroupClass = "";
	let iconClass = "";

	if (field.meta.touched) {
		if (field.error || field.input.value > 4 || field.input.value < 0 || !field.input.value) {
			formGroupClass = "has-error";
			iconClass = "glyphicon glyphicon-remove";
		} else {
			formGroupClass = "has-success";
			iconClass = "glyphicon glyphicon-ok";
		}
	}

	return (
		<FormGroup className={`row form-group ${formGroupClass} has-feedback`}>
			<div className={"col-xs-12 col-sm-3 col-md-2"}>
				<input
					{...field.input}
					placeholder={field.placeholder}
					min="0" max="4"
					className={"form-control"}
				/>
				<span className={`${iconClass} form-control-feedback`}></span>
			</div>
			<div className="col-xs-12 col-sm-9 col-md-10">
				<p>{field.description}</p>
			</div>
		</FormGroup>
	)
}