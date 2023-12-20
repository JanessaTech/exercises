import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM0E1MDc3NTBDMTFlYmIxNjcxRDg3N0I0NUZjM0I2NWI2MzUzMUUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjg4MTI1NTcwMiwibmFtZSI6Im15TkZUIn0.BnPRfbejwGCgQsTFX9rydLe4xA2Eqto7gPuwUrOkkhs'

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    console.log('type:', type)
    return new File([content], path.basename(filePath), { type })
}

async function storeNFT() {
    const path = 'files/second-hand/pets/mypet.jpg'
    const image = await fileFromPath(path)
    const nft = {
        image,
        name: 'Selling my pet',
        description: 'My pet is looking for a good person',
        properties: {
            type: 'pet',
            color: 'white',
            age: 1,
            moreInfo: 'healthy and good temper'
        }
    }

    const client = new NFTStorage({ token: API_KEY })
    const metadata = await client.store(nft)

    console.log('NFT data stored!')
    console.log('Metadata: ', metadata)
    console.log('Metadata URI: ', metadata.url)
}

storeNFT()
.catch(err => {
    console.error(err)
    process.exit(1)
})

