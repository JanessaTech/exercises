'use client'

import { useReadContract } from "wagmi"
import {ABI, contractAddress} from "../../lib/abi"

// this example shows how to call contract
// before run this code, you need deploy the contract on hardhat. Here is the contract. 
// we assume we deploy it at 0x5FbDB2315678afecb367f032d93F642f64180aa3. you could get abi either from remix or hardhat compiling file
/**
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hello {
    string private _message = '';

    constructor(string memory message) {
        _message = message;
    }

    function say() public view returns (string memory) {
        return _message;
    }

    function getMessage() public view returns(string memory) {
        return _message;
    }
}
 */
const ContractHome  = () => {
    const {data: message, isError, isLoading} = useReadContract({
        abi:ABI,
        address: contractAddress,
        functionName: 'getMessage',
      })
      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error fetching message</div>;

      console.log(message)
    
      return <div>Contract Message: {`${message}`}</div>;
}

export default ContractHome