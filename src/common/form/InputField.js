import React from 'react';
import { Icon, IconMD } from '../styles/fields';

export const InputField = field => (
	<div>
		<div className="input-group">
			<Icon className="input-group-addon gradient" data-toggle="tooltip" title={field.placeholder}>
				<IconMD className={"fa " + field.icon}></IconMD>
			</Icon>
			<input {...field.input} {...field} className={(field.meta.touched && field.meta.error) ? field.className + " input-error" : field.className} />
		</div>
		<p className="text-danger">
			{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
		</p>
	</div>
)