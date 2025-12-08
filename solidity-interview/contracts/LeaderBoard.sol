// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "hardhat/console.sol";

contract LeaderBoard {
    struct Entry {
        address user;
        uint256 score;
    }
    mapping(address => uint256) scores;
    Entry[3] top3;

    function updateScore(uint256 score) public {
        address user = msg.sender;
        scores[user] = score;
        int256 idx = -1;
        for (uint256 i = 0; i < 3; i++) {
            if (top3[i].user == user) {
                idx = int256(i);
                break;
            }
        }
        if (idx >= 0) {
            top3[uint256(idx)].score = score;
            bubbleSort(uint256(idx));
        } else if (score > top3[2].score){
            top3[2] = Entry(user, score);
            bubbleSort(2);
        }
    }

    function bubbleSort(uint256 index) private {
        while (index > 0 && top3[index].score > top3[index - 1].score) {
            Entry memory tmp = top3[index];
            top3[index] = top3[index - 1];
            top3[index - 1] = tmp;
            index--;
        }
        while(index < 2 && top3[index].score < top3[index + 1].score) {
            Entry memory tmp = top3[index];
            top3[index] = top3[index + 1];
            top3[index + 1] = tmp;
            index++;
        }
    }

    function getTop3() public view returns(Entry[3] memory) {
        return top3;
    }
}