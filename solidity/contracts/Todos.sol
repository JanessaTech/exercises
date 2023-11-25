
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Todos {
    struct Todo {
        string text;
        bool completed;
    }

    Todo[] public todos;

    function create(string calldata _text) public {
        todos.push(Todo({text: _text, completed: false}));
    }
    function get(uint index) public view returns(string memory, bool) {
        Todo storage todo = todos[index];
        return (todo.text, todo.completed);
    }
    function update(string calldata newText, uint index) public {
        Todo storage todo = todos[index];
        todo.text = newText;
    }
    function toggle(uint index) public {
        Todo storage todo = todos[index];
        todo.completed = !todo.completed;
    }
    function reset(uint index) public {
        delete todos[index];
    }
}