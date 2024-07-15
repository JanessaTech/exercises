// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}

contract EnglishAuction {

    IERC721 nft;
    uint256 nftId;
    address payable owner;

    uint256 highestBid;
    address highestBidder;
    mapping(address => uint256) biddings;

    bool started;
    bool ended;
    uint256 endAt;

    constructor(address _nft, uint256 _nftId, uint256 startbidding) {
        nft = IERC721(_nft);
        nftId = _nftId;
        highestBid = startbidding;
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(msg.sender == owner, 'You must be owner');
        _;
    }

    function start() public isOwner {
        require(!started, 'started');

        nft.transferFrom(msg.sender, address(this), nftId);

        started = true;
        endAt = block.timestamp + 3 minutes;  
    }

    function bid() public payable {
        require(started, 'Not started');
        require(block.timestamp < endAt, 'expired');
        require(msg.value > highestBid, 'msg.value <= highestBid');

        biddings[msg.sender] = msg.value;

        highestBid = msg.value;
        highestBidder = msg.sender;
    }

    function end() public isOwner {
        require(started, 'not started');
        require(block.timestamp > endAt, 'block.timestamp <= endAt');

        if (highestBidder == address(0)) {
            nft.safeTransferFrom(address(this), msg.sender, nftId);
        } else {
            nft.safeTransferFrom(address(this), highestBidder, nftId);
            owner.transfer(highestBid);
        }
        ended = true;
    }
}
