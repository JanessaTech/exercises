// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract DutchAuction {
    IERC721 public immutable nft;
    uint256 public immutable nftId;

    address payable public immutable seller;

    uint256 public immutable startingPrice;
    uint256 public immutable disCountRate;
    uint256 public immutable duration;

    uint256 startAt;
    uint256 expireAt;
    constructor(address _nft, 
                uint256 _nftId, 
                uint256 _startingPrice, 
                uint256 _disCountRate, 
                uint256 _duration) {
                    seller = payable(msg.sender);
                    nft = IERC721(_nft);
                    nftId = _nftId;
                    startingPrice = _startingPrice;
                    disCountRate = _disCountRate;
                    duration = _duration;
                    require(startingPrice >= disCountRate * _duration, 'Invalid parameters in init');
                    // WE CANN'T PUT THE LINE IN CONSTRUCTOR
                    //nft.transferFrom(msg.sender, address(this), nftId);
                }

    function start() public{
        startAt = block.timestamp;
        expireAt = startAt + duration;
        nft.transferFrom(msg.sender, address(this), nftId);
    }

    function getPrice() public view returns(uint256) {
        uint256 discount = disCountRate * (block.timestamp - startAt);
        return startingPrice - discount;
    }

    function buy() public payable{
        require(block.timestamp <= expireAt, 'expired');
        uint256 price = getPrice();
        require(msg.value > price, 'msg.value <= price');
        nft.transferFrom(address(this), msg.sender, nftId);
        uint256 refund = msg.value - price;
        if (refund > 0) {
            bool sent = payable(msg.sender).send(refund);
            require(sent, 'failed to refund');
        }
    }

}