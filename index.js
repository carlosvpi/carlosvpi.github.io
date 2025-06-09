const JoinView = () => {
  const join = async () => {
    model.join(nameInput.value, serverInput.value || 'localhost')
  }
  const nameInput = silk('input', { placeholder: 'name' })
  const serverInput = silk('input', { placeholder: 'server IP' })
  return silk('div', {},
    nameInput,
    serverInput,
    silk('button', { onClick: join }, 'Join'),
    silk('p', { classed: classed => {
      model.forEach('status', (status) => classed('invisible', status !== JOINING))
    }}, 'Joining')
  )
}

const Message = ({ author, message }) => {
  return silk('p', { classed: ['message'] },
    silk('strong', {}, `${author}:`),
    silk('span', {}, ' '),
    silk('span', {}, message)
  )
}

let chatView
let playersView

const LobbyView = () => {
  return silk('div', {},
    playersView = silk('div', { id: 'players' },
      silk('ul', {}, add => {
        const playerNames = new Set([])
        model.forEach('players', players => {
          players?.forEach(player => {
            if (playerNames.has(player[1].name)) return
            playerNames.add(player[1].name)
            add(silk('strong', { classed: 'name-tag' }, player[1].name))
          })
        })
      })
    ),
    chatView = silk('div', { id: 'chat' }, 
      silk('ul', {}, add => { model.forEach('messagesDelta', delta => delta.map(Message).forEach(child => add(child))) }),
      silk('input', {
        placeholder: 'say something',
        onKeydown: evt => {
          if (evt.key === 'Enter') {
            model.postMessage(evt.target.value)
            evt.target.value = ''
            return
          }
          setTimeout(() => {
            if (evt.target.value === '') {
              model.setNotTyping()
            } else {
              model.setTyping()
            }
          }, 0)
        }
      })
    ),
    silk('button', {
      classed: classed => model.forEach('isMaster', isMaster => classed('invisible', !isMaster)),
      onClick: model.startGame
    }, 'Start game'),
    silk('p', {
      classed: classed => model.forEach('isMaster', isMaster => classed('invisible', isMaster)),
    }, 'Wait for the game master'),
  )
}

const GameView = () => {
  return silk('div', {}, 
    playersView,
    chatView,
    silk('div', { id: 'card' }, silk(set => model.forEach('card', card => set(card ?? '')))),
    silk('div', { id: 'dice' }, 
      silk('div', { id: 'rolled-dice' }),
      silk('div', { id: 'saved-dice' })
    )
  )
}

window.addEventListener('load', () => {
  const body = silk(document.getElementsByTagName('body')[0])
  let joinView
  let lobbyView
  model.forEach('status', (status) => {
    switch (status) {
      case INIT:
        body.children(joinView = JoinView())
        break;
      case LOBBY:
        body.removeChild(joinView)
        body.children(lobbyView = LobbyView())
        break;
      case JOINING:
        break;
      default:
        body.removeChild(lobbyView)
        body.children(GameView())
    }
  })
});
