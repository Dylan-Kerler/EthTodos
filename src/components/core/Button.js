import React, { useEffect, createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { COLOR_PALETTE } from '../../constants';
import ScaleLoader from "react-spinners/ScaleLoader";

const ButtonWrapper = styled.div`
    height: fit-content;
    width: fit-content;
    padding: 10px 20px;
    background-color: ${({ negative }) => negative ? COLOR_PALETTE.negative : COLOR_PALETTE.primary};
    color: ${COLOR_PALETTE.textSecondary};
    border-radius: 5px;
    user-select: none;

    transition: all 100ms ease-out;

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Button = ({ children, isLoading, onClick, style, negative }) => {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const buttonRef = useRef({});

    // Must wait for component to render first, so use useLayoutEffect instead of useEffect.
    useLayoutEffect(() => {
        // Make sure that when we switch to the loading indicator, the width of the button stays the same.
        // (instead of resizing to fit the loading indicator).
        setWidth(buttonRef.current.offsetWidth + 1);
        setHeight(buttonRef.current.offsetHeight);
    }, []);

    return (
        <ButtonWrapper onClick={onClick} style={{ ...style }} negative={negative}>
            <div ref={buttonRef} style={{ width, height }}>
                {
                    isLoading ?
                        <div style={{ width: "100%", display: "grid", justifyItems: "center", alignItems: "center", marginTop: 0 }}>
                            <ScaleLoader
                                color={"white"}
                                height={15}
                                loading={true}
                            />
                        </div>
                    :
                        children
                }
            </div>
        </ButtonWrapper>
    )
}

export default Button;