// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract Redo {
    IERC721 nft;
    uint256 nftId;

    address owner;

    bool started;
    uint256 endAt;

    mapping(address => uint256) bids;
    address highestBider;
    uint256 highestBid;

    event Start(address indexed from);
    event End(address indexed from);
    event Bid(address indexed from, uint256 amount);
    event Withraw(address indexed from, uint256 amount);

    constructor(address _nft, uint256 _nftId) {
        nft = IERC721(_nft);
        nftId = _nftId;
        owner = msg.sender;
    }

    function start() public {
        require(msg.sender == owner,'not owner');
        require(!started, 'started');
        started = true;
        endAt = block.timestamp + 7 days;
        nft.transferFrom(msg.sender, address(this), nftId);
        emit Start(msg.sender);
    }

    function bid() public payable {
        require(started, 'not started');
        require(block.timestamp < endAt, 'ended');
        require(msg.value > highestBid, 'msg.value <= highestBid');
        if (highestBider != address(0)) {
            bids[highestBider] += highestBid;
        }
        highestBid = msg.value;
        highestBider = msg.sender;
        emit Bid(msg.sender, msg.value);
    }

    function withdraw() public {
        uint256 amount = bids[msg.sender];
        if (amount > 0) {
            bool success = payable(msg.sender).send(amount);
            require(success, 'failed to withdraw');
        }
        emit Withraw(msg.sender, amount);
    }

    function end() public {

    }
}