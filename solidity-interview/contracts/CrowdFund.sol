// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract CrowdFund {
    event CreateCampaign(address indexed owner, uint256 indexed campaignId);
    event CancelCampaign(address indexed owner, uint256 indexed campaignId);
    event PledgeCampaign(address indexed from, uint256 indexed campaignId, uint256 amount);
    event UnpledgeCampaign(address indexed from, uint256 indexed campaignId, uint256 amount);
    event ExclaimCampaign(address indexed owner, uint256 indexed campaignId);
    event RefundCampaign(address indexed from, uint256 indexed campaignId, uint256 refundAmount);

    struct Campaign {
        address owner;
        uint256 start;
        uint256 end;
        uint256 goal;
        uint256 pledged;
        bool isCanceled;
        bool done;
    }

    Campaign[] campaigns;
    IERC20 token;
    mapping(uint256 => mapping(address => uint256)) pledgeAmount;

    constructor(address _token) {
        token = IERC20(_token);
    }

    modifier exist(uint256 campaignId) {
        require(campaignId < campaigns.length, 'campaign does not exist');
        _;
    }

    modifier isOwner(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.owner == msg.sender, 'not owner');
        _;
    }
    modifier notStarted(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp < campaign.start, 'campaign is already started');
        _;
    }
    modifier started(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp >= campaign.start, 'campaign is not started');
        _;
    }
    modifier notEnd(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp < campaign.end, 'campaign is ended');
        _;
    }
    modifier notCancelled(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(!campaign.isCanceled, 'campaign is cancelled');
        _;
    }
    modifier reachEnd(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.end < block.timestamp, 'campaign is not end');
        _;
    }
    modifier notDone(uint256 campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(!campaign.done, 'Already done');
        _;
    }

    function createCampaign(uint256 start, uint256 end, uint256 goal) public {
        require(start < end, 'start >= end when create a new campaign');
        require(start >= block.timestamp, 'start < block.timestamp when create a new campaign');
        uint256 campaignId = campaigns.length; 
        Campaign memory campaign = Campaign({
            owner: msg.sender,
            start: start,
            end: end,
            goal: goal,
            pledged: 0,
            isCanceled: false,
            done: false
        });
        campaigns.push(campaign);
        emit CreateCampaign(msg.sender, campaignId);
    }

    function cancelCampaign(uint256 campaignId) 
        public
        exist(campaignId)
        isOwner(campaignId)
        notStarted(campaignId) {
            Campaign storage campaign = campaigns[campaignId];
            //console.log(campaignId);
            campaign.isCanceled = true;

            emit CancelCampaign(msg.sender, campaignId);
        }
    function pledge(uint256 campaignId, uint256 _amount) 
        public
        exist(campaignId)
        started(campaignId)
        notEnd(campaignId)
        notCancelled(campaignId)
         {
            Campaign storage campaign = campaigns[campaignId];
            campaign.pledged += _amount;
            pledgeAmount[campaignId][msg.sender] = _amount;
            token.transferFrom(msg.sender, address(this), _amount);

            emit PledgeCampaign(msg.sender, campaignId, _amount);
         }

    function unpledge(uint256 campaignId, uint256 _amount) 
        public 
        exist(campaignId)
        notEnd(campaignId){
            require(pledgeAmount[campaignId][msg.sender] >= _amount, 'unpledge too much amount');
            console.log(pledgeAmount[campaignId][msg.sender] );
            pledgeAmount[campaignId][msg.sender] -= _amount;
            token.transfer(msg.sender, _amount);

            emit UnpledgeCampaign(msg.sender, campaignId, _amount);
    }

    function exclaimCampaign(uint256 campaignId) 
        public 
        exist(campaignId)
        reachEnd(campaignId)
        isOwner(campaignId)
        notDone(campaignId)
        {
            Campaign storage campaign = campaigns[campaignId];
            require(campaign.pledged >= campaign.goal, 'pledged is not reached');
            campaign.done = true;
            token.transfer(campaign.owner, campaign.pledged);
            emit ExclaimCampaign(msg.sender, campaignId);
        }

    function refundCampaign(uint256 campaignId) 
        public
        exist(campaignId)
        reachEnd(campaignId) 
        {
            Campaign storage campaign = campaigns[campaignId];
            require(campaign.pledged < campaign.goal, 'waiting for exclaim');
            uint256 refundAmount = pledgeAmount[campaignId][msg.sender];
            token.transfer(msg.sender, pledgeAmount[campaignId][msg.sender]);
            pledgeAmount[campaignId][msg.sender] = 0;

            emit RefundCampaign(msg.sender, campaignId, refundAmount);
        }

    function getCampaign(uint256 campaignId) 
    public view 
    exist(campaignId)
    returns (
        address owner,
        uint256 start,
        uint256 end,
        uint256 goal,
        uint256 pledged,
        bool isCanceled,
        bool done
    ){
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.owner, 
            campaign.start, 
            campaign.end, 
            campaign.goal, 
            campaign.pledged,
            campaign.isCanceled,
            campaign.done
        );
    }

    function getCampaignSize() public view returns(uint256) {
        return campaigns.length;
    }

    function checkPledgeAmount(uint256 campaignId, address who) public view returns(uint256) {
        return pledgeAmount[campaignId][who];
    }

    function getBalance(address campaignOwner) public view returns (uint256) {
        return token.balanceOf(campaignOwner);
    } 


}