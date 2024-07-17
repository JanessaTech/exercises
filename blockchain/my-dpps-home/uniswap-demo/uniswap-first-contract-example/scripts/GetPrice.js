const JSBI = require('jsbi')

function GetPrice() {
    let sqrtPriceX96 = 1441660884467430951484764628303036;
	let Decimal0 = 6;
	let Decimal1 = 18;

    const buyOneOfToken0 = ((sqrtPriceX96 / 2**96)**2) / (10**Decimal1 / 10**Decimal0).toFixed(Decimal1);

	const buyOneOfToken1 = (1 / buyOneOfToken0).toFixed(Decimal0);
	//const buyOneOfToken0 = sqrtPriceX96 ** 2 / (2 ** 192)
	//const buyOneOfToken1 = (2 ** 192 )/ sqrtPriceX96 ** 2
	console.log("price of token0 in value of token1 : " + buyOneOfToken0.toString());
	console.log("price of token1 in value of token0 : " + buyOneOfToken1.toString());
}

GetPrice()

// run: npx hardhat run .\scripts\GetPrice.js\
// see references:
// 1. https://blog.uniswap.org/uniswap-v3-math-primer#how-do-i-calculate-the-current-exchange-rate