import styled from 'styled-components';

const Textarea = styled.textarea`
    resize: none;
`;

const Img = styled.img`
    height: 225px !important;
`;

const Icon = styled.span`
    padding-left: 10px;
    padding-right: 10px;
    max-width: 38px;
    min-width: 38px;
`;

const IconMD = styled.i`
    font-size: 18px;
`;

const FormGroup = styled.div`
    margin-bottom: 7px;
`;

const P = styled.p`
    text-align: justify;
    white-space: pre-line;
    margin-left: 15px;
`;

export { Textarea, Icon, IconMD, Img, FormGroup, P };