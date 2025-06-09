const CONNECTION_ERROR = 'CONNECTION_ERROR'
const INIT = 'INIT'
const JOINING = 'JOINING'
const LOBBY = 'LOBBY'
const TURN1 = 'TURN1'

const createStore = (obj = {}, equals = {}) => {
  const _ = obj
  const subscriptions = {}
  return {
    set: (key, value) => {
      if (equals[key]?.(_[key], value) ?? _[key] === value) return
      _[key] = value
      subscriptions[key]?.forEach(f => f(value))
    },
    get: (key) => _[key],
    subscribe: (key, f) => (subscriptions[key] ||= []).push(f),
    forEach: (key, f) => {
      (subscriptions[key] ||= []).push(f)
      f(_[key])
    }
  }
}

const { get, set, subscribe, forEach } = createStore({
  status: INIT,
  isMaster: false,
  playerId: null,
  players: [],
  dice: [],
  savedDice: [],
  card: null,
  messagesDelta: []
})

const model = {}
model.get = get
model.set = set
model.subscribe = subscribe
model.forEach = forEach

model.join = async (name, server = 'localhost') => {
  set('status', JOINING)
  try {
    const player = await network.addPlayer(name, server)
    set('status', LOBBY)
    set('playerId', player)
    setInterval(model.sync, 2000)
    return player
  } catch(e) {
    set('status', CONNECTION_ERROR)
  }
}

model.setTyping = () => {
  network.setTyping()
}

model.setNotTyping = () => {
  network.setNotTyping()
}

model.postMessage = (message) => {
  network.postMessage(message)
}

model.sync = async () => {
  const data = await network.sync()
  set('isMaster', data.isMaster)
  set('players', data.players)
  set('dice', data.dice)
  set('card', data.card)
  set('messagesDelta', data.messages)
}

model.startGame = async () => {
  if (await network.startGame()) {
    set('status', TURN1)
  } else {
    alert('There was an error')
  }
}
// const setCard = card => set('card', card)

// const roll = async (diceToRoll) => {
//   await fetch('http://localhost:3000/roll', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(diceToRoll)
//   })
//   const rolledDice = await responseAddPlayer.json()
//   console.log('Rolling', diceToRoll, rolledDice)
//   set('dice', rolledDice)
// }