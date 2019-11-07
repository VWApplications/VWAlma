import React from 'react';

export const HiddenField = field => {
	return (
		<div className="row">
			<div className={`col-sm-12`}>
				<input {...field.input} style={{"display": "none"}} />
				<p className="text-danger">{field.meta.error}</p>
			</div>
		</div>
	)
}