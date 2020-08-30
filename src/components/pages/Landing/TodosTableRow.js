import React, { useState } from "react";
import styled from "styled-components";
import EditTodoModal from "./EditTodoModal";
import Text from "../../core/Text";

const Tr = styled.tr`
    border-radius: 3px;
    transition: all 50ms ease-out;

    td {
        padding: 12px;
        &:last-child {
            padding-right: 32px;
        }

        &:first-child {
            padding-left: 32px;
        }
    }

    &:hover {
        box-shadow:  -4px 3px 10px -1px rgba(0,0,0,0.15);
        cursor: pointer;
    }
`;

const TodosTableRow = ({ todo }) => {
    const [showTodoEdit, setShowTodoEdit] = useState(false);

    return (
        <>
            <Tr 
                onClick={() => setShowTodoEdit(true)}
                style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
                <td><Text>{todo.content}</Text></td>
                <td><Text>{todo.owner}</Text></td>
                <td><Text>{todo.priority}</Text></td>
            </Tr>   

            <EditTodoModal 
                isOpen={showTodoEdit} 
                todo={todo}
                onClose={() => setShowTodoEdit(false)}
            />
        </>
    );
};

export default TodosTableRow;