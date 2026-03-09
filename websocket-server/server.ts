import { WebSocketServer } from "ws"

const PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080
const wss = new WebSocketServer({ port: PORT })

if (process.env.NODE_ENV !== "production") {
  console.log(`WebSocket server running on ws://localhost:${PORT}`)
}

wss.on("connection", (ws) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Client connected")
  }

  ws.on("message", (message) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Received:", message.toString())
    }

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString())
      }
    })
  })

  ws.on("close", () => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Client disconnected")
    }
  })
})