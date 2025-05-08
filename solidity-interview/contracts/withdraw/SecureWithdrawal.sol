// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SecureWithdrawal {
    mapping(address => uint256) private balances;
    bool private _locked;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
    
    // 存款函数（演示用）
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * 安全提款函数（三重防护）
     * 1. 使用Checks-Effects-Interactions模式
     * 2. 添加ReentrancyGuard修饰器
     * 3. 限制转账gas并验证结果
     */
    function withdraw() external nonReentrant {
        // 检查阶段
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Zero balance");
        
        // 效果阶段（先更新状态）
        balances[msg.sender] = 0;
        
        // 交互阶段（最后执行外部调用）
        (bool success, ) = payable(msg.sender).call{
            value: amount,
            gas: 2300  // 限制gas防止复杂重入
        }("");
        
        // 失败回滚状态
        if (!success) {
            balances[msg.sender] = amount; // 恢复余额
            revert("Transfer failed");
        }
        emit Withdraw(msg.sender, amount);
    }

    // 查看余额
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}