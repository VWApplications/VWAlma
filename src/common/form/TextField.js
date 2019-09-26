import React from 'react';
import { Textarea } from '../styles/textField';

export const TextField = field => (
	<div>
		<Textarea
			{...field.input}
			{...field}
			className={(field.meta.touched && field.meta.error) ? field.className + " input-error" : field.className}
		/>
		{field.meta.error ?
			<p className="text-danger">
				{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
			</p>
		: ""}
	</div>
)