import * as IPFS from 'ipfs-core'
import fs from 'fs'

const gateway = 'https://ipfs.io/ipfs/'


const DoString = async () => {
    const ipfs = await IPFS.create()
    const { cid } = await ipfs.add('Hello world')
    console.log(cid)
}

const CheckVersion  = async () => {
    const node = await IPFS.create();
    const version = await node.version();
  
    console.log("Version:", version.version);
}

const AddFile = async () => {
    const node = await IPFS.create();
    const version = await node.version();

    console.log("Version:", version.version);

    const result = await node.add({
        path: "hello.txt",
        content: "Hello World 101",
    });
    console.log("Added file:", result.path, result.cid)
}

const retrieving = async () => {
    const node = await IPFS.create();
    const version = await node.version();

    console.log("Version:", version.version);

    const fileAdded = await node.add({
        path: "hello.txt",
        content: "Hello World 101",
    });

    console.log("Added file:", fileAdded.path, fileAdded.cid);

    const decoder = new TextDecoder()
    let text = ''

    for await (const chunk of node.cat(fileAdded.cid)) {
        text += decoder.decode(chunk, {
      stream: true
    })
  }

  console.log("Added file contents:", text);
}
const AddImge = async () => {
    const imagesDir = './pics'

    const files = fs.readdirSync(imagesDir)
    
    const ipfs = await IPFS.create()
    
    for(let file of files) {
      const buffer = fs.readFileSync(`${imagesDir}/${file}`)
      const result = await ipfs.add(buffer)
      console.log(result)
    }
}

const RetrievingData = async () => {  // some issue?
    const imagesDir = './pics'
    const files = fs.readdirSync(imagesDir)
    const ipfs = await IPFS.create()

    for(let file of files) {
    const buffer = fs.readFileSync(`${imagesDir}/${file}`)
    const result = await ipfs.add(buffer)
    console.log(result)
    console.log(gateway+result.path)
    }
}

const AddImage2 = async () => {
    const node = await IPFS.create();
    const image = './pics/me.png'
    const imageAdded = await node.add({
        path: image,
        content: fs.readFileSync(image)
      });
    console.log(gateway+imageAdded.path)
    console.log("Added image:", imageAdded.path, imageAdded.cid)  
}

//DoString()
//CheckVersion()
//AddFile()
//retrieving()
//AddImge()
AddImage2()
//RetrievingData()

/**
 * 1. https://dev.to/rtagliavia/how-to-add-images-to-ipfs-with-nodejs-and-ipfs-core-3heo
 * 2. https://github.com/ipfs-examples/js-ipfs-101
 * 3. https://stackoverflow.com/questions/73793326/how-can-i-upload-a-json-file-or-javascript-object-to-ipfs-in-nextjs
 * 4. 
 */