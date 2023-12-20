import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM0E1MDc3NTBDMTFlYmIxNjcxRDg3N0I0NUZjM0I2NWI2MzUzMUUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjg4MTI1NTcwMiwibmFtZSI6Im15TkZUIn0.BnPRfbejwGCgQsTFX9rydLe4xA2Eqto7gPuwUrOkkhs'
async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    console.log('type:', type)
    return new File([content], path.basename(filePath), { type })
}

async function main() {
    const args = process.argv.slice(2)
    if (args.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
        process.exit(1)
    }

    const [imagePath, name, description] = args
    const result = await storeNFT(imagePath, name, description)
    console.log(result)
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })