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
    mapping(uint => uint[]) public userToTodo;
    uint[] public users;

    function reset() public {
        for (uint i = 0; i < users.length; i++) {
            delete userToTodo[users[i]];
        }
        delete todos;
        delete users;
    }

    function addTodo(uint _userId, string memory _title, string memory _body) public {
        Todo memory newTodo = Todo({id: todos.length, title: _title, body:_body, removed:false});
        todos.push(newTodo);
        userToTodo[_userId].push(newTodo.id);
        bool isreg = isUserRegistered(_userId);
        if (!isreg) {
            users.push(_userId);
        }   
    }

    function isUserRegistered(uint _userId) public view returns(bool) {
        bool res = false;
        for(uint i = 0; i < users.length; i++) {
            if (users[i] == _userId) {
                res = true;
                break;
            }
        }
        return res;
    }

    function getLatestTodo(uint _userId) public view returns (Todo memory) {
        Todo memory latest;

        uint[] storage ids = userToTodo[_userId];
        if (ids.length > 0) {
            latest = todos[ids[ids.length - 1]];
        }
        return latest;  
    }

    function getTodos(uint _userId) public view returns(Todo[] memory) {
        uint count = getCount(_userId);
        Todo[] memory res = new Todo[](count);
        if (count > 0) {
            uint[] storage ids = userToTodo[_userId];
            uint idx = 0;
            for(uint i = 0; i < ids.length; i++) {
                Todo storage todo = todos[ids[i]];
                if (!todo.removed) {
                    res[idx] = todo;
                    idx++;
                }   
            }
        }
        return res;
    }

    function getCount(uint _userId) public view returns(uint) {
        uint[] storage ids = userToTodo[_userId];
        uint count = 0;
        for (uint i = 0; i < ids.length; i++) {
            Todo storage todo = todos[ids[i]];
            if (!todo.removed) {
                count++;
            }
        }
        return count;
    }

    function updateTodo(uint _userId, uint _id, string memory _title, string memory _body) public {
        require(_id < todos.length, "todo id is out of index");
        bool exist = checkTodoExist(_userId, _id);
        require(exist, 'user does not contain this id');
        Todo storage todo = todos[_id];
        require(!todo.removed, "The todo is already removed");
        todo.title = _title;
        todo.body = _body;
    }

    function checkTodoExist(uint _userId, uint _id) public view returns(bool){
        bool res = false;
        if (userToTodo[_userId].length > 0) {
            uint[] storage ids = userToTodo[_userId];
            for (uint i = 0; i < ids.length; i++) {
                if (ids[i] == _id) {
                    res = true;
                    break;
                }
            }
        }
        return res;
    }

    function deleteTodo(uint id) public {
        require(id < todos.length, "id is out of index");
        Todo storage todo = todos[id];
        require(!todo.removed, "The todo is already removed");
        todo.removed = true;
    }
}