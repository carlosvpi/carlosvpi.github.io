const network = {}

network.addPlayer = async (name, server) => {
  network.server = server
  const response = await fetch(`http://${network.server}:3000/addPlayer`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar: 'yes' })
  })
  const player = await response.json()
  return player
}

network.setTyping = async () => {
  const response = await fetch(`http://${network.server}:3000/setTyping`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  })
  return await response.json()
}

network.setNotTyping = async () => {
  const response = await fetch(`http://${network.server}:3000/setNotTyping`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  })
  return await response.json()
}

network.postMessage = async (message) => {
  const response = await fetch(`http://${network.server}:3000/postMessage`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message })
  })
  return await response.json()
}

network.sync = async () => {
  const response = await fetch(`http://${network.server}:3000/broadcast`)
  return await response.json()
}

network.startGame = async () => {
  const response = await fetch(`http://${network.server}:3000/startGame`, { method: 'POST' })
  return await response.json()
}