import React from 'react';
import { Textarea } from '../styles/fields';

export const AlternativeField = field => (
	<div className="row form-group">
		<div className={`col-sm-12 col-md-12`}>
			<label forhtml="comment">{field.label}:</label>
			<button type="button" className="btn btn-danger btn-xs pull-right" onClick={field.removeField}>
				<i className="fa fa-trash"></i> remover
			</button>
		</div>
		<div className={`col-sm-12 col-md-12`}>
			<Textarea
				{...field.input}
				rows={5}
				placeholder="Descrição da alternativa."
				className="form-control"
				type="text"
				id="comment"
			/>
			{field.meta.error ?
				<p className="text-danger">
					{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
				</p>
			: ""}
		</div>
	</div>
)