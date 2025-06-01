'use client'

import { useReadContract } from "wagmi"
import {ABI, contractAddress} from "../../lib/abi"

// we will be using contract src/contract/hello.sol
// make sure that you deployed it on hardhat and update the contractAddress defined in lib/abi.ts to the your address
// before you run the codes below

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