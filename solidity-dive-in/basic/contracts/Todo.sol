// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Todos {
    struct Todo {
        string text;
        bool completed;
    }
    Todo[] todos;
    function create(string memory _text) public {
        todos.push(Todo({text: _text, completed: false}));
    }
    function get(uint index) public returns(string memory, bool) {
        Todo storage todo = todos[index];
        return (todo.text, todo.completed);
    }
    

}