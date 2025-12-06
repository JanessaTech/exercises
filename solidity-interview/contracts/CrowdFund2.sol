// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "hardhat/console.sol";

contract CrowdFund2 {
    uint256 targetAmount;
    address owner;
    bool started;
    uint256 deadline;
    uint256 duration;

    uint256 raised;
    mapping(address => uint256) contributions;

    bool claimed;
    bool isSuccess;

    event Contribute(address indexed from, uint256 amount);
    event Claim(address indexed from, uint256 amount);
    event Refund(address indexed from, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, 'not owner');
        _;
    }
    modifier onlyStarted() {
        require(started, 'not started');
        _;
    }
    modifier onlyEnded() {
        require(block.timestamp >= deadline, 'not end');
        _;
    }

    constructor(uint256 _targetAmount, uint256 _duration) {
        targetAmount = _targetAmount;
        duration= _duration;
        owner = msg.sender;
    }

    function start() public onlyOwner {
        started = true;
        deadline = block.timestamp + duration * 1 days;
    }

    function contribute() public payable onlyStarted {
        require(block.timestamp < deadline, 'ended');
        require(msg.value > 0, 'msg.value = 0');
        contributions[msg.sender] += msg.value;
        raised += msg.value;

        emit Contribute(msg.sender, msg.value);
    }

    function claim() public onlyOwner onlyStarted onlyEnded {
        require(!claimed, 'claimed');

        claimed = true;
        isSuccess = raised >= targetAmount;
        if (isSuccess) {
            payable(owner).transfer(raised);
        }
        // if (raised >= targetAmount) {
        //     isSuccess = true;
        //     (bool success, ) = payable(owner).call{value: raised}('');
        //     require(success, 'failed to transfer eth');
        //     emit Claim(msg.sender, raised);
        // } else {
        //     isSuccess = false;
        // }
        // emit Claim(msg.sender, 0);
    }

    function refund() public onlyStarted onlyEnded {
        require(claimed, 'not claimed');
        require(!isSuccess, 'success');

        uint256 amount = contributions[msg.sender];
        require(amount > 0, 'no eth to refund');
        contributions[msg.sender] = 0;

        payable(owner).transfer(raised);
        // (bool success, ) = payable(msg.sender).call{value: amount}('');
        // require(success, 'failed to refund');

        emit Refund(msg.sender, amount);
    }

    function getStatus () public view returns(string memory) {
        if (!started) return "NOT STARTED";
        if (block.timestamp < deadline) return "ACTIVE";
        if (!claimed) return "PENDING_CLAIMED";
        if (isSuccess) return "SUCCESS";
        return "FAILED";
    }
}

/** 
 * optimization:
 * 1. use call instead of transfer
 * 2. use uncheck for the non-overflowed math calculation
 * 3. use non-reentrant lock
 * 4. 
 * */ 
/**
 * why call is more better?
 * - for transfer there is gas limitation which is 2300. 
 *   if the caller calling refund is a contract with fallback executing extra logic, 
 *   gas needed may exceed 2300, which leads to a potential failure
 * - for call, we can gas limitation explictly which is more flexible. 
 *   Of course, we need introduce reentrant lock to prevent reenrant attack
 */
