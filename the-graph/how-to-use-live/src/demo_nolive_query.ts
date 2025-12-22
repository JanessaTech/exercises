import { gql } from 'graphql-request'
import {execute} from '../.graphclient'

const myQuery = gql`
  query getPoolData($id: String!) {
    pools(where: {id: $id}) {
      feeTier
      liquidity
      id
      token0 {
        decimals
        name
        symbol
      }
      tick
      token1 {
        name
        symbol
        decimals
      }
      sqrtPrice
      token1Price
      token0Price
    }
}`


async function main() {
    const result = await execute(myQuery, {id: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36'})
    console.log(JSON.stringify(result, null, 2))
  }
main()


// npx ts-node .\src\demo_nolive_query.ts