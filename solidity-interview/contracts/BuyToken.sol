// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Simuluate how to buy ERC20 token using eth

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BuyToken {
    address owner;
    uint256 price;
    IERC20 token;
    uint256 quantity;
    bool purchased  = false;
    uint256 expiredAt;

    event Buy(address indexed from);
    event Refund();
    event NoFund();

    constructor(address _token, uint256 _price,uint256 _quantity){
        owner = msg.sender;
        token = IERC20(_token);
        price = _price;
        quantity = _quantity;
    }

    function buy() public payable {
        require(msg.value >= price, 'Not enough eth');
        uint256 _refund = msg.value - price;
        bool sent = payable(msg.sender).send(_refund);
        require(sent, 'failed to refund');
        purchased = true;
        expiredAt = block.timestamp + 1 days;
        require(token.balanceOf(address(this)) == quantity, 'invalid token quantity');
        token.transfer(msg.sender, quantity);
        emit Buy(msg.sender);
    }

    function refund() public {
        require(block.timestamp >= expiredAt, 'Not expired');
        require(owner == msg.sender, 'Not owner');
        if (!purchased) {
            token.transfer(owner, quantity);
            emit Refund();
        }else {
            emit NoFund();
        }
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}