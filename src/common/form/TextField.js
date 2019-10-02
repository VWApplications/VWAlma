import React from 'react';
import { Textarea } from '../styles/fields';

export const TextField = field => (
	<div className="form-group">
		<label forhtml="comment">{field.label}{field.label ? ":" : ""}</label>
		<Textarea {...field.input} {...field} className={"form-control " + field.className} id="comment" />
		{field.meta.error ?
			<p className="text-danger">
				{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
			</p>
		: ""}
	</div>
)