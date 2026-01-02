import EventEmitter from "events";
import { ChainConfig, ChainMonitor } from "./ChainMonitor";

interface MonitorConfig {
    configs: ChainConfig[];
    pollInterval: number
}
class MultiChainMonitor extends EventEmitter {
    private mconfig: MonitorConfig
    private monitorMap: Map<string, ChainMonitor>
    private isRunning: boolean

    constructor(_mconfig: MonitorConfig) {
        super()
        this.mconfig = _mconfig
        this.monitorMap = new Map()
        this.isRunning = false
        this.init()
    }

    private init() {
        console.info(`Init MultiChainMonitor`)
        let cnt = 0
        for (let config of this.mconfig.configs) {
            if (config.enabled) {
                try {
                    const monitor = new ChainMonitor(config)
                    monitor.on('data', (update) => {
                        console.info('Received update:', update)
                    })
                    this.monitorMap.set(config.chainName, monitor)
                    cnt++
                } catch(error) {
                    console.error(`Failed to create monitor for chain ${config.chainName} due to:`, error)
                }
            }
        }
        console.info(`${cnt} ChainMonitors were created`)
    }

    public async start() {
        if (this.isRunning) {
            console.warn('MultiChainMonitor is already started')
            return
        }
        this.isRunning = true
        console.info('Starting MultiChainMonitor...');
        const startPromises = Array.from(this.monitorMap.values()).map(async (monitor) => {
            try {
                await monitor.start()
                return true
            } catch (error) {
                console.error(`Failed to start monitor ${monitor.getName()} due to:`, error)
            }
            return false
        })
        const results = await Promise.allSettled(startPromises)
        const startedCnt  = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
        console.info(`${startedCnt} ChainMonitors were started`)
    }

    public async stop() {
        this.isRunning = false
        const startPromises = Array.from(this.monitorMap.values()).map(async (monitor) => {
            try {
                await monitor.stop()
                return true
            } catch (error) {
                console.error(`Failed to start monitor ${monitor.getName()} due to:`, error)
            }
            return false
        })
        const results = await Promise.allSettled(startPromises)
        const startedCnt  = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
        console.info(`${startedCnt} ChainMonitors were stopped`)
    }

    public getStatus(chainName: string) {
        return this.monitorMap.get(chainName)?.getHealth()
    }

    public getAllStatuses() {
        const statuses: {[P in any]: unknown}  = {}
        for (let [chainName, monitor] of this.monitorMap) {
            const health = monitor.getHealth()
            statuses[chainName] = health
        }
        return statuses
    }
}

async function main() {
    const ethereumPoolIds = ["0xe0554a476a092703abdb3ef35c80e0d76d32939f", 
        "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
        "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
        "0x7bea39867e4169dbe237d55c8242a8f2fcdcc387",
        "0x493035412520336ff4719d4cee527bea55eca844",
        "0xdceaf5d0e5e0db9596a47c0c4120654e80b1d706",
        "0xa8e45fe78bcf372d8f0a8f6a25868e66088a1365",
        "0x3416cf6c708da44db2624d63ea0aaef7113527c6",
        "0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf",
        "0xee4cf3b78a74affa38c6a926282bcd8b5952818d",
        "0xbb256c2f1b677e27118b0345fd2b3894d2e6d487",
        "0x4674abc5796e1334b5075326b39b748bee9eaa34",
        "0x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb",
        "0x1353fe67fff8f376762b7034dc9066f0be15a723",
        "0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b",
        "0x11b815efb8f581194ae79006d24e0d814b7697f6",
        "0x4e68ccd3e89f51c3074ca5072bbac773960dfa36",
        "0xc5af84701f98fa483ece78af83f11b6c38aca71d",
        "0x4d1ad4a9e61bc0e5529d64f38199ccfca56f5a42",
        "0x7161e6f4babc4ec23e78865c09f1e5c095f84e47"] 
        const ethereumChainConfig: ChainConfig = {
            chainName: 'ethereum',
            enabled: true,
            graphClientDir:'../lib/ethereum/.graphclient',
            queryName: 'GetMultipleEthereumPoolLiveData',
            poolIds: ethereumPoolIds,
            maxRetries: 5,
            retryInterval: 10
        }

        const arbitrumPoolIds = ["0xc35ab4ee32198d3f7e82f9e5aa66daafb7a73c6e",
            "0x46c47c8daabca3e15bf238cda365894046bafa23",
            "0x2c089ee1080b091fb3b73df94f7840b33fbca020",
            "0x0779450b087a86c40e074ac00a65eabe1cbc0f87",
            "0x31fa55e03bad93c7f8affdd2ec616ebfde246001",
            "0xa961f0473da4864c5ed28e00fcc53a3aab056c1b",
            "0x2e630136c42bc72f1285743347ba77a75077aff4",
            "0x7cf803e8d82a50504180f417b8bc7a493c0a0503",
            "0x9264e764e6d5d252a5c17c457c9bb059b8831bb1",
            "0xd46c8a1940113ae64f960b7aa12ef5dcab0ffe0e",
            "0xbff936a43e6fe6f891789be66043bcc8effee938",
            "0x03a3be7ab4aa263d42d63b6cc594f4fb3d3f3951",
            "0x2f5e87c9312fa29aed5c179e456625d79015299c",
            "0x149e36e72726e0bcea5c59d40df2c43f60f5a22d",
            "0x99dfc0126ed31e0169fc32db6b89adf9fee9a77e",
            "0xbd65e976bd6b0b59232144c7966e1065024b874c",
            "0x0e4831319a50228b9e450861297ab92dee15b44f",
            "0x6985cb98ce393fce8d6272127f39013f61e36166",
            "0x719826896832c9deaa868272f2dd55cf1e5ca3e7",
            "0xfab99b9bdcd3eae784595dee64ac97879f9c3179",
            "0x64085bd18cc11bd853d1f065d09299635bdc6f2d",
            "0x803b90b0fdc44065c2442df3c5afb93e4d15c2fa",
            "0xd6ee3e36e0f11a60ee880703946f33275f59a723",
            "0x6f38e884725a116c9c7fbf208e79fe8828a2595f",
            "0xc6962004f452be9203591991d15f6b388e09e8d0",
            "0xc473e2aee3441bf9240be85eb122abb059a3b57c",
            "0x42fc852a750ba93d5bf772ecdc857e87a86403a9"]

        const arbitrumPoolIdsChainConfig: ChainConfig = {
            chainName: 'arbitrum',
            enabled: true,
            graphClientDir:'../lib/arbitrum/.graphclient',
            queryName: 'GetMultipleArbitrumPoolLiveData',
            poolIds: arbitrumPoolIds,
            maxRetries: 5,
            retryInterval: 10
        } 
        const monitorConfig: MonitorConfig = {configs: [ethereumChainConfig, arbitrumPoolIdsChainConfig], pollInterval: 10} 
        const multiChainMonitor = new MultiChainMonitor(monitorConfig)
        await multiChainMonitor.start()
}
main().catch((e) => console.error(e))
//npx ts-node .\src\MultiChainMonitor.ts