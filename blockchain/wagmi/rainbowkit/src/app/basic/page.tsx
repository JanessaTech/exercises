'use client'

import { useAccount, 
    useBalance, 
    useBlock,  
    useChainId,
    useChains} from 'wagmi';

const BasicPage = () => {
    const account = useAccount()
    const balance = useBalance({address: '0x8d0bb74e37ab644964aca2f3fbe12b9147f9d841'})
    const block = useBlock ({
        blockHash: '0xe4ca576667956449948fc827f83544c4fc16eebd5a0c203072732cd6079e2406'
    })
    const chainId = useChainId() 
    const chains = useChains()

    return (
        <div>
            <div>
                <div>address: {account.address}</div>
                <div>chanId: {account.chainId}</div>
                <div>chanId: {chainId.toString()}</div>
                <div>status : {account.status}</div>
                <div>balance: {balance.data?.value.toString()} </div>
                <div>block info</div>
                <div>Block number: {block.data?.number.toString()}</div>
                <div>block transactions size: {block.data?.transactions.length}</div>
                <div>block timestamp: {block.data?.timestamp.toString()}</div>
                <div>block gasUsed: {block.data?.gasUsed.toString()}</div>
                <div>block gasLimit: {block.data?.gasLimit.toString()}</div>
                <div>supported chains: {chains.map((e) => e.name + ',')}</div>
                <div></div>
            </div>
        </div>
    )
}

export default BasicPage