import React, { useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import Cross from "./Cross";
import { COLOR_PALETTE } from "../../constants";

export const CloseModalContext = createContext();

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        isOpen ? 
            ReactDOM.createPortal(
                <CloseModalContext.Provider value={onClose}>
                    <div 
                        style={{ position: "fixed", height: "100%", width: "100%", zIndex: 100, backgroundColor: "rgba(0, 0, 0, 0.7)" }} 
                        onClick={e => {
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <div 
                            style={{ 
                                position: "absolute",
                                top: "50%", 
                                left: "50%", 
                                transform: "translate(-50%, -50%)",
                            }} 
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ backgroundColor: "white", borderRadius: 5, padding: 24, position: "relative", width: "fit-content" }}>
                                <div 
                                    style={{ 
                                        width: "100%", 
                                        display: "grid", 
                                        justifyItems: "right", 
                                        right: 16,
                                        top: 16,
                                        marginBottom: 12, 
                                        position: "absolute",
                                    }}
                                >
                                    <div style={{ width: "fit-content", cursor: "pointer", }}  onClick={onClose}>
                                        <Cross
                                            color={COLOR_PALETTE.textPrimary}
                                            style={{ height: 30, width: 30 }}
                                        />
                                    </div>
                                </div>

                                {children}
                            </div>
                        </div>
                    </div>
                </CloseModalContext.Provider>,
                document.getElementById("modal-root")
            )
        : 
            <></>
    );
}

export default Modal;