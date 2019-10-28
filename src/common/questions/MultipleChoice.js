import React from 'react';
import styled from 'styled-components';
import { P } from '../styles/fields';

const CustomRadio = styled.div`
    margin-bottom: 15px;
    input[type="radio"] {
        display: none;

        :checked + label:before {
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            box-shadow: inset 0 0 0 0.2em white, inset 0 0 0 1em green;
        }
    }
`;

const Label = styled.label`
    position: relative;
    display: inline-block;
    padding-left: 30px;
    margin-right: 1em;
    padding-top: 2px;
    cursor: pointer;
    line-height: 1em;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    :before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        text-align: center;
        color: black;
        font-family: Times;
        border-radius: 50%;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    :before {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        box-shadow: inset 0 0 0 0.2em white, inset 0 0 0 1em white;
        border: 1px solid gray;
    }

    :hover:before {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        box-shadow: inset 0 0 0 0.3em white, inset 0 0 0 1em #c6c6c6;
    }
`;

export default field => {
    return (
        <CustomRadio>
            <input
                name={field.input.name}
                type={field.input.type}
                value={field.input.value}
                onFocus={field.input.onFocus}
                onBlur={field.input.onBlur}
                onChange={field.input.onChange}
                id={field.id}
            />
            <Label htmlFor={field.id}><P>{field.label}</P></Label>
        </CustomRadio>
    )
}