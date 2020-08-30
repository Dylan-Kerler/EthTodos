import styled from "styled-components";
import { COLOR_PALETTE } from '../../constants';

const Text = styled.div`
    height: fit-content;
    width: fit-content;
    font-size: ${props => props.main ? "22px" : ""};
    color: ${COLOR_PALETTE.textPrimary};
`;

export default Text;