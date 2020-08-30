import React, { useState, useContext, useEffect } from "react";
import Modal from "../../core/Modal";
import Text from "../../core/Text";
import TextAreaInput from "../../core/Inputs/TextAreaInput";
import Button from "../../core/Button";
import { AccountContext, NotificationsContext } from "../../../context";
import { COLOR_PALETTE } from "../../../constants";
import TextInput from "../../core/Inputs/TextInput";

const AddTodoModal = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { account } = useContext(AccountContext);
    const [newTodo, setNewTodo] = useState({});
    const { addNotification } = useContext(NotificationsContext);

    useEffect(() => {
        setNewTodo(old => ({ ...old, owner: account }))
    }, [account]);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const todosContract = await window.todosSmartContract.deployed();
            // Make sure we have valid defaults here.
            await todosContract.addTodo({
                content: "", 
                id: 0, 
                owner: "", 
                priority: "", 
                completed: false,
                ...newTodo,
            }, { from: account });
        
            addNotification({ content: "Sucessfully added todo" });
            onClose();
        } catch (e) {
            addNotification({ content: "Failed to add todo", color: COLOR_PALETTE.negative },);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ width: 400, display: "grid", rowGap: 12 }}>
                <Text main>Add Todo</Text>
                <TextAreaInput
                    placeholder={"Enter content for todo..."}
                    onChange={e => {
                        const content = e.target.value;
                        setNewTodo(old => ({ ...old, content }));
                    }}
                />

                <div>
                    <Text style={{ marginBottom: 6 }}>Priority</Text>
                    <TextInput
                        placeholder={"Enter some priority..."}
                        onChange={e => {
                            const priority = e.target.value;
                            setNewTodo(old => ({ ...old, priority}))
                        }}
                    />
                </div>

                <Button
                    isLoading={isLoading}
                    style={{ justifySelf: "right" }}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </div>
        </Modal>
    )
};

export default AddTodoModal;
