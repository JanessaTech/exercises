import { EventEmitter } from "events";

type PoolDetails = {
    id: string;
    liquidity: string;
    tick:number;
    sqrtPriceX96: string;
    fee: string;
}
type PoolUpdate  = {
    chainName: string;
    timestamp: number;
    pools: PoolDetails[]
}

interface ChainMonitorEvents {
    'data': (update: PoolUpdate) => void;
}

interface ChainMonitor {
    on<U extends keyof ChainMonitorEvents>(event: U, listener: ChainMonitorEvents[U]): this;
    emit<U extends keyof ChainMonitorEvents>(event: U, ...args: Parameters<ChainMonitorEvents[U]>): boolean
}

interface ChainConfig {
    chainName: string;
    enabled: boolean;
    graphClientDir: string;
    poolIds: string[];
    queryName: string;
    maxRetries: number;
    retryInterval: number; 
}

export interface MonitorConfig {
    chains: ChainConfig[];  
}


class ChainMonitor extends EventEmitter {
    private config: ChainConfig
    private sdk: any

    private isRunning: boolean
    private stream?: AsyncIterable<any>
    private lastUpdateTime: number = 0

    private retryCount: number = 0
    private retryTimer?: NodeJS.Timeout

    constructor(chainConfig: ChainConfig) {
        super()
        this.config = chainConfig
        this.sdk = this.load()
        this.isRunning = false
    }

    private load() {
        try {
            const sdk = require(this.config.graphClientDir)
            return sdk.getBuiltGraphSDK ? sdk.getBuiltGraphSDK() : sdk;
        } catch(error) {
            console.error(`[Monitor<${this.config.chainName}>] Failed to load sdk due to: ${error}`)
            throw new Error(`[Monitor<${this.config.chainName}>] Graph Client not found for chain ${this.config.chainName}. Run g'raphclient build' first`)
        }
    }

    public async start() {
        if (this.isRunning) {
            console.error(`[Monitor<${this.config.chainName}>] Monitor for ${this.config.chainName} is already running`)
            return
        }
        this.isRunning = true
        console.info(`[Monitor<${this.config.chainName}>] Start monitor...`)
        try {
            const queryMethod = await this.sdk[this.config.queryName]
            if (!queryMethod || typeof queryMethod !== 'function') {
                throw new Error(`[Monitor<${this.config.chainName}>] Query method ${this.config.queryName} is not found`)
            }
            this.stream = await queryMethod({poolIds: this.config.poolIds}) as AsyncIterable<any>
            this.processStream()
        } catch (error) {
            await this.handleError(error as Error)
        }

    }

    private async processStream() {
        if (!this.isRunning || !this.stream) {
            console.error(`[Monitor<${this.config.chainName}>] The monitor is not running or no stream is found`)
            throw new Error('The monitor is not running or no stream is found')
        }
        try {
            for await (const result of this.stream) {
                if (!this.isRunning) {
                    console.info(`[Monitor<${this.config.chainName}>] Exit stream loop`)
                    break
                }
                const chainKey = `uniswapv3_${this.config.chainName}`
                const poolData = result[chainKey]

                console.info(`[Monitor<${this.config.chainName}>] poolData=`, poolData)
                this.lastUpdateTime = Date.now()
                this.retryCount = 0
            }
        } catch (error) {
            console.error(`[Monitor<${this.config.chainName}>] Failed to process stream: ${error}`)
            throw new Error('Failed to process stream')
        }
    }

    private handleError(error: Error) {
        if (this.retryCount >=  this.config.maxRetries) {
            console.info(`[Monitor<${this.config.chainName}>] Reached the max attempts ${this.config.maxRetries}. Stop!`)
            this.isRunning = false
            this.stream = undefined
            return
        }
        
        if (this.retryTimer) {
            clearTimeout(this.retryTimer)
            this.retryTimer = undefined
        }
        this.retryCount++
        const delay = this.config.retryInterval ** this.retryCount
        console.info(`[Monitor<${this.config.chainName}>] Handle error (attempt ${this.retryCount}/${this.config.maxRetries}). Delay: ${delay} ms`, error)
        this.retryTimer = setTimeout(async () => {
            await this.stop()
            await this.start()
        }, delay);

    }

    public async stop() {
        this.isRunning = false
        this.stream = undefined
        console.info(`[Monitor<${this.config.chainName}>] The monitor is stopped`)
    }

    
    public getHealth() {
        const status = {
            lastUpdateTime: this.lastUpdateTime,
            isRunning: this.isRunning,
            retryCount: this.retryCount
        }
        return status
    }
}

async function main() {
    const poolIds = ["0xe0554a476a092703abdb3ef35c80e0d76d32939f", 
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
        const chainConfig: ChainConfig = {
            chainName: 'ethereum',
            enabled: true,
            graphClientDir:'../lib/ethereum/.graphclient',
            queryName: 'GetMultipleEthereumPoolLiveData',
            poolIds: poolIds,
            maxRetries: 5,
            retryInterval: 10
        }
        
    const chainMonitor = new ChainMonitor(chainConfig)
    chainMonitor.start()
}

main().catch((e) => console.error(e))



// npx ts-node .\src\ChainMonitor.ts