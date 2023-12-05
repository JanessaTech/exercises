// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyTodo {
    
    struct Todo {
        uint id;
        string title;
        string body;
        bool removed;
    }
    
    Todo[] public todos;

    function addTodo(string memory _title, string memory _body) public {
        todos.push(Todo({id: todos.length, title: _title, body:_body, removed:false}));
    }

    function getTodos() public view returns(Todo[] memory) {
        Todo[] memory res = new Todo[](todos.length);
        for(uint i = 0; i < todos.length; i++) {
            res[i] = todos[i];
        }
        return res;
    }

    function updateTodo(uint id, string memory _title, string memory _body) public {
        require(id < todos.length, "id is out of index");
        Todo storage todo = todos[id];
        require(!todo.removed, "The todo is already removed");
        todo.title = _title;
        todo.body = _body;
    }

    function deleteTodo(uint id) public {
        require(id < todos.length, "id is out of index");
        Todo storage todo = todos[id];
        require(!todo.removed, "The todo is already removed");
        todo.removed = true;
    }
}