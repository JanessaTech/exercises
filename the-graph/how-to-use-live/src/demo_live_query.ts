import {getBuiltGraphSDK} from '../.graphclient'

async function main() {
  const sdk = getBuiltGraphSDK()

  // const {pools: snapshotPool
  // } = await sdk.GetPoolSnapshot({poolId: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36'})
  // console.log(JSON.stringify(snapshotPool, null, 2))

  const liveDataStream   = await sdk.GetPoolLiveData({poolId: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36'})

  try {
    for await (const { pools } of liveDataStream) {
      console.log(`[${new Date().toISOString()}] update pool data:`, pools?.[0]);
      // trigger bussiness codes
    }
  } catch (error) {
    console.error('Found error. Polling stopped:', error);
  }
}
main()


// npx ts-node .\src\demo_live_query.ts