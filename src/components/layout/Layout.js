import React from 'react';
import styled from "styled-components";
import NotificationBar from './NotificationBar';

const Container = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
`;

const Layout = ({ children }) => {
    return (
        <Container>
            {children}
            <NotificationBar/>
        </Container>
    )
}

export default Layout;