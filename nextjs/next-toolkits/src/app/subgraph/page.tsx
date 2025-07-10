
import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import ExampleComponent from './ExampleComponent';
const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
  fetchOptions: {
    headers: {
      Authorization: 'Bearer eada99c8eee80663db1e909b89c14a3f',  // the api key created in https://thegraph.com/studio/apikeys/
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});
const DATA_QUERY = gql`
    query GetTokenPrice($id: ID!) {
    token(id: $id) {
      derivedETH
      name
      symbol
    }
  }
  `;
export default async function Page() {
    const tokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    const result = await client.query(DATA_QUERY,{id: tokenAddress.toLowerCase()}).toPromise();
  if (result.error) {
    return (
      <div>
        <p>Error: {result.error.message}</p>
      </div>
    );
  }
  return (
    <div>
      <ExampleComponent data={result.data} />
    </div>
  );
}
