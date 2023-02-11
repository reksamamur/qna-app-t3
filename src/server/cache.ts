import Redis from "ioredis";
import { env } from "../env.mjs";

// DOESN'T WORK - Because recreated on every request
const _localCache = new Map<string, { data: string; expire: Date }>();
const localCache = {
  get: <T>(key: string) => {
    const cache = _localCache.get(key);
    // return if empty
    if (!cache) return Promise.resolve(cache);

    // remove cache if expired
    const now = new Date();
    if (cache.expire > now) {
      _localCache.delete(key);
      return Promise.resolve(undefined);
    }

    return Promise.resolve(JSON.parse(cache.data) as T);
  },
  set: <T>(key: string, data: T) => {
    const expireDefault = 60 * 1000; // 1 minutes
    const expireDate = new Date(new Date().getTime() + expireDefault);

    _localCache.set(key, { data: JSON.stringify(data), expire: expireDate });

    return Promise.resolve();
  },
  delete: (key: string) => {
    _localCache.delete(key);

    return Promise.resolve();
  },
};

const redis = new Redis(env.REDIS_URL);

const redisCache = {
  get: async <T>(key: string) => {
    const cache = await redis.get(key);

    // return if empty
    if (!cache) return cache;

    return JSON.parse(cache) as T;
  },
  set: async <T>(key: string, data: T) => {
    const expireDefault = 60; // 1 minutes
    await redis.set(key, JSON.stringify(data), "EX", expireDefault);
  },
  delete: async (key: string) => {
    await redis.del(key);
  },
};

export const cache = env.NODE_ENV !== "production" ? localCache : redisCache;
