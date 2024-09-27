import { initialize, isConnected } from "avail-js-sdk" // Global import

const WS_SERVER = process.env.WS_SERVER
const api = await initialize(WS_SERVER)
const [chain, nodeName, nodeVersion] = await Promise.all([
  api.rpc.system.chain(),
  api.rpc.system.name(),
  api.rpc.system.version(),
])

console.log(
  `Connected to chain ${chain} using ${nodeName} and node version ${nodeVersion} - is connected: ${isConnected()}`,
)

api.on('disconnected', (event)=> {
    console.log(`Event that trigger disconection: ${event}`)
    process.exit(1)
})
