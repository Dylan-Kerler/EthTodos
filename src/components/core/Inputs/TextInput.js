import styled from "styled-components";
import { COLOR_PALETTE } from '../../../constants';

const TextInput = styled.input`
    background-color: white;
    border: 2px solid transparent;
    border-radius: 4px;
    box-shadow:  -4px 3px 10px -1px rgba(0,0,0,0.15);
    padding: 12px;
    width: calc(100% - 24px);
    transition: border 0.1s ease-in-out;
    resize: vertical;
    font: 400 13.3333px Arial;

    &:focus {
        border: 2px solid ${COLOR_PALETTE.secondary};
        outline: none;
    }
`

export default TextInput;