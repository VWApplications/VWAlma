import React from 'react';
import { Input } from '../styles';

export const InputField = field => (
	<div>
		<div className="input-group">
			{field.label ?
				<div className="input-group-prepend">
					<span className="input-group-text">{field.label}</span>
				</div>
			: ""}
			<Input
				{...field.input}
				{...field}
				className={(field.meta.touched && field.meta.error) ? field.className + " input-error" : field.className}
			/>
		</div>
		<p className="text-danger">
			{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
		</p>
	</div>
)