import WebSocket from "ws";

const WS_SERVER = process.env.WS_SERVER
const ws = new WebSocket(WS_SERVER);

// When the connection is open, log a message
ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.on('ping', () => {
    console.log("Received a ping")
})

// Handle any errors
ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// Log the WebSocket closing event
ws.onclose = (event) => {
  console.log("WebSocket connection closed:", event);
  process.exit(1)
};

ws.pong = () => {
  console.log("Prevented pong response");
};
