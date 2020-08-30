import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { NotificationsContext } from "../../context";
import { COLOR_PALETTE } from "../../constants";
import Text from "../core/Text";
import Cross from "../core/Cross";

const NotificationBar = props => {
    const { notifications, setNotifications, } = useContext(NotificationsContext);

    return (
        ReactDOM.createPortal(
            <div style={{ position: "fixed", bottom: 8, left: "50%", transform: "translateX(-50%)", zIndex: 200 }}>
                {
                    notifications?.map(notification =>
                        <div 
                            style={{ 
                                width: 800, 
                                backgroundColor: notification.color ?? COLOR_PALETTE.positive, 
                                padding: 20, 
                                marginBottom: 12,
                                borderRadius: 5,
                                display: "grid",
                                gridTemplateColumns: "1fr auto",
                                alignItems: "center",
                                color: "white",
                            }}
                        >
                            <Text style={{ color: "white" }}>{notification.content}</Text>
                            <Cross 
                                style={{ height: 30, width: 30, justifySelf: "right" }}
                                onClick={() => setNotifications(existing_notifications => 
                                    existing_notifications.filter(({ id: _id}) => _id !== notification.id)
                                )}    
                            />
                        </div>
                    )
                }
            </div>,
            document.getElementById("notification-bar")
        )
    );
}

export default NotificationBar;