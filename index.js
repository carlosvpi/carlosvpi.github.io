const f = async () => {  
  
}

window.addEventListener('load', async () => {
  const responseAddPlayer = await fetch('http://localhost:3000/addPlayer', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({name: 'carlos', avatar: 'yes' })
  })
  const data = await responseAddPlayer.json()
  const body = silk(document.getElementsByTagName('body')[0])
  let addMessage = null
  setInterval(async () => {
    debugger
    const response = await fetch('http://localhost:3000/broadcast')
    const data = await response.json()
    console.log(data)
  }, 1000)
  body.addChild(
    silk('div', {},
      silk('h1', {}, 'Isla Calavera'),
      silk('ul', {}, add => addMessage = add)
    )
  )
});
