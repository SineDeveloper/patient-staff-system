let socket: WebSocket | null = null
const messageQueue: string[] = []

function getWebSocketURL(): string {
  if (typeof window === "undefined") return "ws://localhost:8080"
  
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  const host = process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${window.location.host}`
  return host
}

function flushMessageQueue() {
  while (messageQueue.length > 0 && socket && socket.readyState === WebSocket.OPEN) {
    const message = messageQueue.shift()
    if (message) {
      socket.send(message)
    }
  }
}

export function connectWebSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    const wsURL = getWebSocketURL()
    socket = new WebSocket(wsURL)

    socket.onopen = () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("WebSocket connected")
      }
      flushMessageQueue()
    }

    socket.onclose = () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("WebSocket disconnected. Reconnecting...")
      }

      setTimeout(() => {
        connectWebSocket()
      }, 3000)
    }
  }

  return socket
}

export function sendMessage(message: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    messageQueue.push(message)
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      connectWebSocket()
    }
    return
  }
  socket.send(message)
}