// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract SubscriptionPayment {

    mapping(address => uint256) payments;
    address[] subscribers;
    mapping(address => bool) isSubscribed;
    mapping (address=>uint) subIds;

    address[] unpayeds;

    uint256 frequency;
    uint256 price;
    address payable owner;

    event Payment(address indexed from);

    constructor(uint256 _price, uint256 _frequency) {
        price = _price;
        frequency = _frequency;
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(owner == msg.sender, 'not owner');
        _;
    }

    modifier isPayed() {
        require(payments[msg.sender] > 0 && payments[msg.sender] + frequency >= block.timestamp, 'you are unpayed');
        _;
    }

    function addSubscriber(address sub) private {
        if (!isSubscribed[sub]) {
            isSubscribed[sub] = true;
            subIds[sub] = subscribers.length;
            subscribers.push(sub);
        }
    }
    function deleteSubscriber(address sub) private {
        if (isSubscribed[sub]) {    
            uint idx = subIds[sub];
            address lastSub = subscribers[subscribers.length - 1];
            subscribers[idx] = lastSub;
            subIds[lastSub] = idx;
            subscribers.pop();
            delete subIds[sub];
            isSubscribed[sub] = false;
        }
    }

   function clearUnpayedSubscribers() 
        public 
        isOwner {
            for (uint i = 0; i < subscribers.length; i++) {
                address subscriber = subscribers[i];
                if (payments[subscriber] > 0 && payments[subscriber] + frequency < block.timestamp){
                    unpayeds.push(subscriber);
                }
            }
            for (uint i = 0; i < unpayeds.length; i++) {
                deleteSubscriber(unpayeds[i]);
            }
            delete unpayeds;  //clear
   }

   function getSubscribers() public view returns(address[] memory) {
    return subscribers;
   }

    function pay() public payable {
        require(msg.value == price, 'Incorrect payment');
        require(payments[msg.sender] == 0 || payments[msg.sender] + frequency < block.timestamp, 'You already payed');
        payments[msg.sender] = block.timestamp;
        addSubscriber(msg.sender);
        emit Payment(msg.sender);
    }

    function listenMusic() 
        public 
        view
        isPayed
        returns(string memory) {
        return 'ok';
    }
}