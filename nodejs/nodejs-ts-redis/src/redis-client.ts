import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

interface RedisConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
}

class RedisClient {
    private client: Redis;
    
    constructor(config: RedisConfig) {
        this.client = new Redis(config)
        this.initEventListener()
    }

    private initEventListener(): void {
        this.client.on('connect', () => console.log('Connected to Redis'));
        this.client.on('error', (err) => console.error('Redis error:', err));
    }

    async set(key:string, value:string, ttl?: number): Promise<boolean> {
        try {
            if (ttl) {
                await this.client.setex(key, ttl, value)
            } else {
                await this.client.set(key, value)
            }
            return true
        } catch(err) {
            console.error('Redis set error:', err)
            return false
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key)
        } catch (err) {
            console.error('Redis get error:', err)
            return null
        }
    }

    async delete(key: string): Promise<boolean> {
        try {
            const res = await this.client.del(key)
            return res > 0
        } catch (err) {
            console.error('Redis delete error:', err)
            return false
        }
    }
}
const config: RedisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0')
};

export default new RedisClient(config);