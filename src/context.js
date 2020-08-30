import React, { useEffect, createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodosContext = createContext();
export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        window.todosSmartContract.deployed().then(async todosContract => {
            const updateTodos = async () => {
                const todos = await todosContract.getTodos().then(todos => 
                  // Get rid of the array items and switch to a pure object
                  todos?.map(({ completed, content, id, owner, priority }) => ({ completed, content, id, owner, priority }))
                );

                setTodos(todos ?? []);
            };

            updateTodos();

            // Listen to the contract's todos events and then update the context throughout the app.
            todosContract.AddTodo().on("data", updateTodos);
            todosContract.UpdateTodo().on("data", updateTodos);
            todosContract.DeleteTodo().on("data", updateTodos);
        });
    }, []);

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            { children }
        </TodosContext.Provider>
    );
};

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();

    useEffect(() => {
        window.web3.eth.getAccounts().then(accounts => {
            setAccount(accounts.first());
        });
    }, []);

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            { children }
        </AccountContext.Provider>
    );
};

export const NotificationsContext = createContext();
export const NoficationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = new_notification => {
        const id = uuidv4();
        setNotifications(existing_notifications => [
            ...existing_notifications,
            { ...new_notification, id }
        ]);

        setTimeout(() => {
            setNotifications(existing_notifications => existing_notifications.filter(({ id: _id }) => id !== _id ))
        }, 10000);
    };

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications, addNotification }}>
            {children}
        </NotificationsContext.Provider>
    )
};