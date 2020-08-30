import React from "react";
import Switch from "react-switch";
import { COLOR_PALETTE } from "../../../constants";

const SwitchInput = props => (
    <Switch 
        checkedIcon={false}
        uncheckedIcon={false}
        width={40}
        height={25}
        onColor={COLOR_PALETTE.positive}
        {...props}
    />
);

export default SwitchInput;