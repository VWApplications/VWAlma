import React from 'react';
import { FormGroup } from '../styles/fields';

export default field => {
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
			<div className={`col-sm-12 col-md-2`}>
				<input
					{...field.input}
					name={field.name}
					type={field.type}
					placeholder={field.placeholder}
                    className={field.className}
                    id={field.id}
				/>
				<span className={"form-control-feedback " + iconClass}></span>
			</div>
            <div className="col-sm-12 col-md-10">
                <p>{field.description}</p>
            </div>
            <p className="text-danger">
                {field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
            </p>
		</FormGroup>
	)
}