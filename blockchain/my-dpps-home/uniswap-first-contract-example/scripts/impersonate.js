const hre = require("hardhat");

async function main() {
    console.log("impernating...");
    const holder = "0xdDb108893104dE4E1C6d0E47c42237dB4E617ACc"
    const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    const mywallet = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const impersonatedSigner = await hre.ethers.getImpersonatedSigner(holder);
    const daiAbi = [
        'constructor(uint256 chainId_)',
        'event Approval(address indexed src, address indexed guy, uint256 wad)',
        'event LogNote(bytes4 indexed sig, address indexed usr, bytes32 indexed arg1, bytes32 indexed arg2, bytes data) anonymous',
        'event Transfer(address indexed src, address indexed dst, uint256 wad)',
        'function DOMAIN_SEPARATOR() view returns (bytes32)',
        'function PERMIT_TYPEHASH() view returns (bytes32)',
        'function allowance(address, address) view returns (uint256)',
        'function approve(address usr, uint256 wad) returns (bool)',
        'function balanceOf(address) view returns (uint256)',
        'function burn(address usr, uint256 wad)',
        'function decimals() view returns (uint8)',
        'function deny(address guy)',
        'function mint(address usr, uint256 wad)',
        'function move(address src, address dst, uint256 wad)',
        'function name() view returns (string)',
        'function nonces(address) view returns (uint256)',
        'function permit(address holder, address spender, uint256 nonce, uint256 expiry, bool allowed, uint8 v, bytes32 r, bytes32 s)',
        'function pull(address usr, uint256 wad)',
        'function push(address usr, uint256 wad)',
        'function rely(address guy)',
        'function symbol() view returns (string)',
        'function totalSupply() view returns (uint256)',
        'function transfer(address dst, uint256 wad) returns (bool)',
        'function transferFrom(address src, address dst, uint256 wad) returns (bool)',
        'function version() view returns (string)',
        'function wards(address) view returns (uint256)'
      ]
    const daiContract = new hre.ethers.Contract(DAI, daiAbi, impersonatedSigner)
    const tx = await daiContract.transfer(mywallet, 2000)
    console.log('mint successfully')
    console.log(tx)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// how to run:
// npx hardhat run --network localhost .\scripts\impersonate.js