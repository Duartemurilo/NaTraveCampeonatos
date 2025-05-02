import { useSWRConfig } from "swr";

export type TUseMutateReturn<T> = {
  mutate: (matcher: string) => Promise<T[]>;
};
function useMutate<T>(): TUseMutateReturn<T> {
  const { cache, mutate: _mutate } = useSWRConfig();

  const mutate = (matcher: string) => {
    if (!(cache instanceof Map)) {
      throw new Error("matchMutate requires the cache provider to be a Map instance");
    }

    const keys: string[] = [];
    for (const key of cache.keys()) {
      if (key.includes(matcher)) {
        keys.push(key);
      }
    }

    const mutations = keys.map((key) => _mutate(key));
    return Promise.all(mutations);
  };
  return { mutate };
}

export default useMutate;
