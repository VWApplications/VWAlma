import React from 'react';

export const CheckboxField = field => (
	<div className="custom-control custom-switch">
		<input {...field.input} type="checkbox" className={field.className + " custom-control-input"} id="switch1" />
		<label className="custom-control-label" htmlFor="switch1">
			{field.label}
		</label>
	</div>
)