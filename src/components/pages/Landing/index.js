import React, { useContext, useState, useMemo } from "react";
import TodosTable from "./TodosTable";
import Button from "../../core/Button";
import Text from "../../core/Text";
import AddTodoModal from "./AddTodoModal";
import { AccountContext, TodosContext } from "../../../context";
import { COLOR_PALETTE } from "../../../constants";

const Landing = () => {
    const { account } = useContext(AccountContext);
    const { todos } = useContext(TodosContext);
    const [showAddTodo, setShowAddTodo] = useState(false);

    const { openCount, completedCount } = useMemo(() => {
        return todos.reduce(({ openCount, completedCount }, todo) => ({
            openCount: !todo.completed ? openCount + 1 : openCount,
            completedCount: todo.completed ? completedCount + 1 : completedCount,
        }), { openCount: 0, completedCount: 0})
    }, [todos]);

    return (
        <div style={{ marginTop: 200, marginBottom: 42 }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", marginBottom: 12, marginTop: 12 }}>
                <div>
                    <Text main style={{ marginBottom: 6 }}>
                        Welcome {account}
                    </Text>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr" }}>
                        <div style={{ marginRight: 12, color: COLOR_PALETTE.tertiary }}>
                            {openCount} open.
                        </div>
                        <div style={{ color: COLOR_PALETTE.positive }}>
                            {completedCount} completed.
                        </div>
                    </div>
                </div>

                <div style={{ justifySelf: "right" }}>
                    <Button onClick={() => setShowAddTodo(true)}>
                        Add Todo
                    </Button>

                    <AddTodoModal 
                        isOpen={showAddTodo} 
                        onClose={() => setShowAddTodo(false)}
                    />
                </div>
            </div>

            <TodosTable todos={todos}/>
        </div>
    );
};

export default Landing;