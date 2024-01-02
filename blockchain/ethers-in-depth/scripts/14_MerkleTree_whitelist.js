const { MerkleTree } = require('merkletreejs')
const {ethers} = require('ethers')

const tokens = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
];
/**
 * See more at : https://github.com/merkletreejs/merkletreejs/blob/master/README.md
 */
function RunMerkleTree() { 
    const leaves = tokens.map(x => ethers.keccak256(x))
    const merkleTree = new MerkleTree(leaves, ethers.keccak256, {sortPairs: true})
    const proof = merkleTree.getHexProof(leaves[0])
    const root = merkleTree.getHexRoot()
    const matched = merkleTree.verify(proof, leaves[0], root)
    console.log('Leaves:')
    console.log(leaves)
    console.log('\nMerkleTree:')
    console.log(merkleTree.toString())
    console.log("proof for leaves[0]:")
    console.log(proof)
    console.log('root:')
    console.log(root)
    console.log('matched:', matched)
    console.log(merkleTree.getHexProof('xxxxx'))
}

RunMerkleTree()