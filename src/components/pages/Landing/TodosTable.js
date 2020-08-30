import React from "react";
import TodosTableRow from "./TodosTableRow";
import styled from "styled-components";
import { COLOR_PALETTE } from "../../../constants";
import Text from "../../core/Text";

const Table = styled.table`
    width: 100%;

    th {
        text-align: left;
        color: ${COLOR_PALETTE.grey};
        padding: 12px 12px 6px 12px;

        &:last-child {
            padding-right: 32px;
        }

        &:first-child {
            padding-left: 32px;
        }
    }
`;

const TodosTable = ({ todos }) => {
    return (
        <div 
            style={{ 
                minHeight: 300, 
                position: "relative",
                border: `1px solid ${COLOR_PALETTE.lightGrey}`, 
                borderRadius: 3, 
                boxShadow: `-2px 3px 27px -1px rgba(0,0,0,0.05)` 
            }}
        >
            <Table>
                <tr>
                    <th>Content</th>
                    <th>Owner</th>
                    <th>Priority</th>
                </tr>

                { 
                    todos.length <= 0 ?
                        <Text style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)" }}>
                            Hmm, looks like your all caught up!
                        </Text>
                    :
                        todos.map(todo => <TodosTableRow todo={todo}/>) 

                }
            </Table>    
        </div>
    )
};

export default TodosTable;