// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract Todos {
	uint internal total_todos;

	struct Todo {
		uint id;
		address owner;
		string content;
		bool completed; 
		string priority;
	}

	Todo[] public todos;
	mapping (address => string) public usernames;
	
	event UpdateUsername(address from, string username);
	event AddTodo(address from, Todo new_todo);
	event UpdateTodo(address from, uint id, Todo new_todo);
	event DeleteTodo(address from, uint id);

	function addTodo(Todo memory new_todo) public { 
		total_todos += 1;
		Todo memory _new_todo = Todo({
			content: new_todo.content,
			owner: new_todo.owner,
			priority: new_todo.priority,
			completed: false,
			id: total_todos // Increment the id by one more than the current largest id.
		});

		todos.push(_new_todo);

		emit AddTodo(msg.sender, _new_todo);
	}

	function updateTodo(uint id, Todo memory new_todo) public returns (bool) {
		for (uint i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos[i] = new_todo;

				emit UpdateTodo(msg.sender, id, new_todo);
				return true;
			}
		}

		return false;
	}

	function deleteTodo(uint id) public returns (bool) {
		for (uint i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				if (todos.length > 1) { todos[i] = todos[todos.length-1]; }
				delete todos[todos.length-1];
				todos.length -= 1;

				emit DeleteTodo(msg.sender, id);
				return true;
			}
		}

		return false;
	}

	function updateUsername(string memory username) public {
		usernames[msg.sender] = username;
		emit UpdateUsername(msg.sender, username);
	}

	function getUsername(address owner) public view returns (string memory) {
		return usernames[owner];
	}

	function getTodos() public view returns (Todo[] memory) {
		return todos;
	}
}
