// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address, uint256) external;
}

contract AbiEncode {
    function test(address _contract, bytes calldata data) external {
        (bool ok,) = _contract.call(data);
        require(ok, "call failed");
    }

    function encodeWithSignature(address to, uint256 amount)
        external
        pure
        returns (bytes memory)
    {
        // Typo is not checked - "transfer(address, uint)"
        return abi.encodeWithSignature("transfer(address,uint256)", to, amount);
    }

    function encodeWithSelector(address to, uint256 amount)
        external
        pure
        returns (bytes memory)
    {
        // Type is not checked - (IERC20.transfer.selector, true, amount)
        return abi.encodeWithSelector(IERC20.transfer.selector, to, amount);
    }

    function encodeCall(address to, uint256 amount)
        external
        pure
        returns (bytes memory)
    {
        // Typo and type errors will not compile
        return abi.encodeCall(IERC20.transfer, (to, amount));
    }
    // transfer(address,uint256)
    function encodeByKeccak256(string memory selector) public pure returns(bytes4) {
        return bytes4(keccak256(bytes(selector)));
    }

    function getData(address to, uint256 amount) public pure returns(bytes memory) {
        return abi.encode(to, amount);
    }

    // "transfer(address,uint256)",0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,10
    function putTogether(string memory selector, address to, uint256 amount) external pure returns(bytes memory) {
        return abi.encodePacked(encodeByKeccak256(selector), getData(to, amount));
    }
}