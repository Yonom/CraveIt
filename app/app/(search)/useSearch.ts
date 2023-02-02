import type { Topic } from "../../searchWorker/types";
import { use } from "react";
import WebworkerPromise from "webworker-promise";

const searchWorker =
  globalThis.Worker &&
  new WebworkerPromise(
    new Worker(new URL("../../searchWorker/worker.ts", import.meta.url))
  );

const decryptionKey = globalThis.location?.hash.slice(1) ?? "";
export const dbType = decryptionKey[0] !== "U" ? "antler" : "ef";

// init the worker
(async () => {
  try {
    await searchWorker?.exec("init", decryptionKey);
  } catch {
    globalThis.alert(
      "Unable to decrypt the idea database, the password in the URL is either missing or incorrect."
    );
  }
})();

const getResults = async (topic: string) => {
  if (!topic) return null;
  return searchWorker.postMessage(topic) as Promise<Topic[]>;
};

const resultCache = {} as Record<string, ReturnType<typeof getResults>>;
const getResultsOrCache = (topic: string) => {
  if (topic in resultCache) {
    return resultCache[topic];
  }
  const res = getResults(topic);
  resultCache[topic] = res;
  return res;
};

const useSearch = (topic: string | null) => {
  return use(getResultsOrCache(topic ?? ""));
};

export default useSearch;
