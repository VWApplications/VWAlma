import React from 'react';

export const CheckboxField = field => {
	const checkbox = (
		<label className={field.inline ? "checkbox-inline" : ""}>
			<input {...field.input} type="checkbox" className={field.className} />
			{field.label}
		</label>
	)

	if (field.inline)
		return checkbox
	else
		return <div className="checkbox">{checkbox}</div>
}