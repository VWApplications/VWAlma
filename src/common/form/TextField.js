import React from 'react';
import { Textarea } from '../styles/fields';

export const TextField = field => {

	let labelCol = 12
	if (field.labelCol) labelCol = field.labelCol
	let fieldCol = 12
	if (field.fieldCol) fieldCol = field.fieldCol

	return (
		<div className="row form-group">
			<div className={`col-sm-12 col-md-${labelCol}`}>
				<label forhtml="comment" className={field.labelClass}>{field.label}{field.label ? ":" : ""}</label>
			</div>
			<div className={`col-sm-12 col-md-${fieldCol}`}>
				<Textarea {...field.input} {...field} className={"form-control " + field.className} id="comment" />
				{field.meta.error ?
					<p className="text-danger">
						{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
					</p>
				: ""}
			</div>
		</div>
	)
}