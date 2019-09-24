import React from 'react';
import { Label, Input } from '../styles';

export const CheckboxField = field => (
	<div className="custom-control custom-switch">
		<Input {...field.input} type="checkbox" className={field.className + " custom-control-input"} id="switch1" />
		<Label className="custom-control-label" htmlFor="switch1">
			{field.label}
		</Label>
	</div>
)