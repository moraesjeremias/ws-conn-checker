import { getApiInstance } from "./api.js";
import { isConnected } from "avail-js-sdk";

const INTERVAL_MS = parseInt("120000" || "", 10) || 3600000;
const WS_SERVER = process.env.WS_SERVER

let avail_api;
let stopped = false;

async function initializeApi(url) {
  try {
    const api = await getApiInstance(url);
    avail_api = api;
  } catch (e) {
    console.error(`Error initializing avail api: ${e}`);
    throw new Error(`Error initializing avail api: ${e}`);
  }
}

async function start() {
  process.on("SIGINT", () => {
    if (stopped) {
      console.warn("Force stopping..");
      process.exit();
    } else {
      // sendAlert("Stopping Light client ... ⚠️‼️");
      console.warn("Stopping.. (Ctrl-C again to force)");
      stopped = true;
    }
  });
  
  const [chain, nodeName, nodeVersion] = await Promise.all([
    avail_api.rpc.system.chain(),
    avail_api.rpc.system.name(),
    avail_api.rpc.system.version(),
  ])
  
  console.log(
    `Connected to chain ${chain} using ${nodeName} and node version ${nodeVersion} - is connected: ${isConnected()}`,
  )

  console.log("Starting operator...");
  run();
  console.log("Operator started.");
}

async function run() {
  while (!stopped) {
    const startTime = Date.now();
    console.log("Running loop at " + new Date().toISOString());
    await loop();
    console.log(
      "Loop Finished after " + (Date.now() - startTime) / 1000 + "sec."
    );

    const timeToSleep = Math.max(INTERVAL_MS - (Date.now() - startTime), 0);
    await new Promise((resolve) => setTimeout(resolve, timeToSleep));
  }
}

async function loop() {
    let headvalue = await avail_api.query.vector.head();
    await fakePromiseFunction("firstExec", 1000)
    console.log(`This is VectorXQuery Head: ${headvalue}`)
    await fakePromiseFunction("secoundExec", 5000)
}


async function fakePromiseFunction(param, timeout) {
    setTimeout(()=>{
        console.log(`PARAM ${param} fake promise execution`)
    }, timeout)
}

await initializeApi(WS_SERVER)
await start()
