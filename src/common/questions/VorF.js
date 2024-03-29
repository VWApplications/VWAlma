import React from 'react';
import styled from 'styled-components';
import { P } from '../styles/fields';

const Slide = styled.div`
	width: 100%;
	height: 26px;
	margin-bottom: 10px;
	background: #333;
	position: relative;
	border-radius: 50px;
	box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);

	:after {
		content: 'F';
		color: #f71010;
		position: absolute;
		right: 10px;
		z-index: 0;
		font: 15px/26px Arial, sans-serif;
		font-weight: bold;
	}

	:before {
		content: 'V';
		color: #27ae60;
		position: absolute;
		left: 10px;
		z-index: 0;
		font: 15px/26px Arial, sans-serif;
		font-weight: bold;
	}

	label {
		display: block;
		width: 50%;
		height: 20px;
		cursor: pointer;
		position: absolute;
		top: 3px;
		left: 3px;
		z-index: 1;
		background: #fcfff4;
		background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
		border-radius: 50px;
		transition: all 0.4s ease;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
	}

	input[type=checkbox] {
		visibility: hidden;
		:checked + label {
			left: 45%;
		}
	}
`;

export default field => {
	return (
		<div className="row">
			<div className="col-sm-1">
				<Slide>
					<input
						{...field.input}
						id={field.id}
						type={field.input.type}
						className={field.className}
						checked={field.input.checked}
					/>
					<label htmlFor={field.id}></label>
				</Slide>
			</div>
			<div className="col-sm-11">
				{field.form ? field.label : <P style={{"paddingTop": "2px"}}>{field.label}</P> }
			</div>
		</div>
	)
}