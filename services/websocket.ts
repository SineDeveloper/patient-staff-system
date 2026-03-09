let socket: WebSocket | null = null

export function connectWebSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://localhost:8080")

    socket.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting...")

      setTimeout(() => {
        connectWebSocket()
      }, 3000)
    }
  }

  return socket
}