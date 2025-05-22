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

    function bid() public {
        
    }
    function withdraw() public {

    }
    function end() public {

    }
}