const f = async () => {  
  const response = await fetch('http://localhost:3000/addPlayer', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({name: 'carlos', avatar: 'yes' })
  })
  const data = await response.json()
}

window.addEventListener('load', async () => {
  console.log('hi there')
  debugger
  const body = silk(document.getElementsByTagName('body')[0])
});