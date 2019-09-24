import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
    resize: none;
`;

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