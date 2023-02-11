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
};

export const cache = localCache;
