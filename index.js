const postMessage = async (message) => {
  const responseAddPlayer = await fetch('http://localhost:3000/postMessage', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message })
  })
  console.log('Added player', await responseAddPlayer.json())
}

const addPlayer = async () => {
  const responseAddPlayer = await fetch('http://localhost:3000/addPlayer', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: 'carlos', avatar: 'yes' })
  })
  console.log('Added player', await responseAddPlayer.json())
}

window.addEventListener('load', () => {
  addPlayer()
  let addMessage = null
  setInterval(async () => {
    const response = await fetch('http://localhost:3000/broadcast')
    const data = await response.json()
    console.log(data)
  }, 1000)
  const body = silk(document.getElementsByTagName('body')[0])
  body.addChild(
    silk('div', {},
      silk('h1', {}, 'Isla Calavera'),
      silk('ul', {}, add => addMessage = add),
      silk('div', {},
        silk('input', {
          onKeydown: evt => {
            if (evt.key !== 'Enter') {
              return
            }
            postMessage(evt.target.value)
            evt.target.value = ''
          }
        })
      ),
    )
  )
});
