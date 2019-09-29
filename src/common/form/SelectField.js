import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
    margin-top: 5px;
`;

const SelectGroup = ({ children, label }) => (
    <Group>
        <div className="form-group">
            <label htmlFor="selectID" className="white">{label}</label>
            {children}
        </div>
    </Group>
)

export const SelectField = field => (
    <SelectGroup label={field.label}>
        <select id="selectID" name={field.name} className={"form-control " + field.className}>
            {field.options.map((option, index) => {
                return <option key={index} value={option.value}>{option.title}</option>
            })}
        </select>
        {field.meta.error ?
			<p className="text-danger">
				{field.meta.touched && (field.meta.error && <span>{field.meta.error}</span>)}
			</p>
		: ""}
    </SelectGroup>
)