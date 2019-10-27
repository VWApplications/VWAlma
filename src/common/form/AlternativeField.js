import React from 'react';
import { Textarea } from '../styles/fields';

export const AlternativeField = field => {

	return (
		<div className="row form-group">
			<div className={`col-sm-12 col-md-12`}>
				<label forhtml="comment" className={field.labelClass}>{field.label}{field.label ? ":" : ""}</label>
                <button type="button" className="btn btn-danger btn-xs pull-right" onClick={field.removeField}>
                    <i className="fa fa-trash"></i> remover
                </button>
			</div>
			<div className={`col-sm-12 col-md-12`}>
                <Textarea
                    {...field.input}
                    type="text"
                    rows={5}
                    name={field.name}
                    placeholder="Descrição da alternativa."
                    className="form-control"
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
}