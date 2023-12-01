const { ethers } = require("ethers");

const contractAddr = '0x311febbd6685883d4c10a01724ab469c29b53a7f'
const network = "sepolia"
const INFURA_API_KEY = '0326c4f69a034543b424b27d34057159'
const SIGNER_PRIVATE_KEY = '0xa4ceece280db4b773cacb13075585736d250aa1d2e6dcedaf874d6313561d01e'
const provider = new ethers.providers.InfuraProvider(
    network
  );
const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);


ReadSmartContract = async () => {
    const abi = [
        'function getName() public view returns(string)',
        'function setName(string _name) public']
    const helloword = new ethers.Contract(contractAddr, abi, provider)

    const name = await helloword.getName()
    console.log('The name in contract is:', name)
}

WriteSmartContract = async () => {
    const abi = [
        'function getName() public view returns(string)',
        'function setName(string _name) public']
    const helloword = new ethers.Contract(contractAddr, abi, provider)

    const hellowordWithSigner = helloword.connect(signer)
    const tx = await hellowordWithSigner.setName("Janessa tech")
    await tx.wait()
    console.log(tx)

    const newName = await helloword.getName()
    console.log('The newName in contract is:', newName)

}
/**
 * This demo shows how to interact with the smart contract deployed on testnet sepolia
 * we use infura as provider to access to sepolia
 * Make sure you deployed the smart contract on testnet sepolia before running the codes.
 * I used remix to deploy the contract (MetaMask is configured with sepolia, see https://www.notion.so/Node-providers-Relay-network-0d7e00cec1dd4cc1ac116cd6035986ce?pvs=4)
 * 
 */
ReadSmartContract()
//WriteSmartContract()
