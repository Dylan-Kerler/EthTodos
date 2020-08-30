import React, { useState, useContext } from "react";
import Modal from "../../core/Modal";
import TextAreaInput from "../../core/Inputs/TextAreaInput";
import Button from "../../core/Button";
import Text from "../../core/Text";
import { AccountContext, NotificationsContext } from "../../../context";
import { COLOR_PALETTE } from "../../../constants";
import "@material/react-checkbox/dist/checkbox.css";
import SwitchInput from "../../core/Inputs/SwitchInput";
import TextInput from "../../core/Inputs/TextInput";

const EditTodoModal = ({ isOpen, onClose, todo }) => {
    const [newTodo, setNewTodo] = useState(todo);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const { account } = useContext(AccountContext);
    const { addNotification } = useContext(NotificationsContext);

    const onSubmit = async () => {
        setIsSubmitLoading(true);
        try {
            const todosContract = await window.todosSmartContract.deployed();
            await todosContract.updateTodo(todo.id, newTodo, { from: account });
            addNotification({ content: "Sucessfully added todo" });
            onClose();
        } catch (e) {
            addNotification({ content: "Failed to add todo", color: COLOR_PALETTE.negative });
            console.error(e);
        } finally {
            setIsSubmitLoading(false);
        }
    };

    const onDelete = async () => {
        setIsDeleteLoading(true);
        try {
            const todosContract = await window.todosSmartContract.deployed();
            await todosContract.deleteTodo(todo.id, { from: account });
            addNotification({ content: "Sucessfully deleted todo" });
            onClose();
        } catch (e) {
            addNotification({ content: "Failed to delete todo", color: COLOR_PALETTE.negative });
            console.error(e);
        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ width: 400, display: "grid", rowGap: 18 }}>
                <Text main>Edit Todo</Text>
                <TextAreaInput
                    placeholder={"Enter content for todo..."}
                    value={newTodo?.content}
                    onChange={e => {
                        const content = e.target.value; // Make sure synthetic event persists.
                        setNewTodo(old => ({ ...old, content }))
                    }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 24 }}>
                    <div style={{ height: "fit-content", width: "fit-content",}}>
                        <Text style={{ marginBottom: 6 }}>Complete</Text>
                        <SwitchInput
                            onChange={completed => setNewTodo(old => ({ ...old, completed }))} 
                            checked={newTodo?.completed}
                        />
                    </div>

                    <div>
                        <Text style={{ marginBottom: 6 }}>Priority</Text>
                        <TextInput
                            placeholder={"Enter some priority..."}
                            value={newTodo?.priority}
                            onChange={e => {
                                const priority = e.target.value;
                                setNewTodo(old => ({ ...old, priority}))
                            }}
                        />
                    </div>
                </div>

                <div style={{ justifySelf: "right", display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                    <Button
                        style={{ marginRight: 12 }}
                        negative
                        isLoading={isDeleteLoading}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>

                    <Button
                        isLoading={isSubmitLoading}
                        style={{ backgroundColor: COLOR_PALETTE.secondary }}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

export default EditTodoModal;