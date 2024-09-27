import { ApiPromise, initialize } from "avail-js-sdk";

let apiInstance = ApiPromise;
export const getApiInstance = async (url) => {
  try {
    const Endpoint = url || "wss://turing-rpc.avail.so";
    if (apiInstance) {
      if (apiInstance.isConnected) {
        console.log("Existing API instance is connected");
        return apiInstance;
      } else {
        console.log("API instance is not connected");
        apiInstance = await initialize(Endpoint);
        return apiInstance;
      }
    } else {
      console.log("Initializing new API instance");
      apiInstance = await initialize(Endpoint);
      return apiInstance;
    }
  } catch (e) {
    console.error("Api initialization failed", e);
    throw new Error("API Connection failed");
  }
};
export const disConnectApi = async (api) => {
  if (api.isConnected) {
    console.log("Disconnecting new API instance");
    await api.disconnect();
  }
};
