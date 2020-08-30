const Todos = artifacts.require("Todos");

// Integration tests
contract('Todos', (accounts) => {
  it('should add a todo', async () => {
    const todosSmartContract = await Todos.deployed();

    await todosSmartContract.addTodo({ content: "Hello", owner: accounts[0], priority: "Low", completed: false, id: 0 });
    let todos = await todosSmartContract.getTodos();

    assert.equal(todos.length, 1, "Todo wasn't added");
    assert.equal(todos[0].id, "1", "Id was not updated correctly");
    assert.equal(todos[0].content, "Hello", "Content was not added correctly");
    assert.equal(todos[0].completed, false, "Completed should always default to false on creation");
    assert.equal(todos[0].priority, "Low", "Priority was not update propesly");
    assert.equal(todos[0].owner, accounts[0], "Owner was not updated properly");

    await todosSmartContract.addTodo({ content: "Goodbye", owner: accounts[0], priority: "High", completed: false, id: 0 });
    todos = await todosSmartContract.getTodos();

    assert.equal(todos.length, 2, "Todo wasn't added");
    assert.equal(todos[1].id, "2", "Id was not updated correctly");
    assert.equal(todos[1].content, "Goodbye", "Content was not added correctly");
    assert.equal(todos[1].completed, false, "Completed should always default to false on creation");
    assert.equal(todos[1].priority, "High", "Priority was not update propesly");
    assert.equal(todos[1].owner, accounts[0], "Owner was not updated properly");
  });

  it("should delete a todo", async () => {
    const todosSmartContract = await Todos.deployed();

    let todos = await todosSmartContract.getTodos();
    assert.equal(todos.length, 2, "There should be 2 existing todos");

    await todosSmartContract.deleteTodo("2");
    todos = await todosSmartContract.getTodos();

    assert.equal(todos.length, 1, "1 existing todo should have been removed");
    assert.equal(todos[0].id, "1", "Todo with the 'id' of 1 should not have been removed");

    await todosSmartContract.deleteTodo("1");
    todos = await todosSmartContract.getTodos();

    assert.equal(todos.length, 0, "Todo should have been removed");
  });

  it("should update a todo", async () => {
    const todosSmartContract = await Todos.deployed();

    await todosSmartContract.addTodo({ content: "Good Evening", owner: accounts[0], priority: "High", completed: false, id: 0 });
    await todosSmartContract.updateTodo(3, { content: "Good Morning", owner: accounts[0], priority: "Low", completed: true, id: 0 })
    let todos = await todosSmartContract.getTodos();

    assert.equal(todos.length, 1, "Only 1 todo exist");
    assert.equal(todos[0].content, "Good Morning", "Content should have been updated");
    assert.equal(todos[0].priority, "Low", "Priority should have been updated");
    assert.equal(todos[0].completed, true, "Todo should have been marked as complete");
  });
});
