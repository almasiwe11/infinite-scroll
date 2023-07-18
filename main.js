// max 100 images
const container = document.querySelector('.container')
let array = []
let size = 2
let lower = 0 
let higher = size

async function getMemes(){
  try{
    const promise = await fetch('https://api.imgflip.com/get_memes')
    const result = await promise.json()
    array = result.data.memes

    displayMemes(array)

  }catch(error){
    console.log('Soryy we encountered an error', error)
  }
}

function displayMemes(){
  for(let i = lower; i<higher; i++){
    container.insertAdjacentHTML('beforeend', populateContainer(array[i]))
  } 
}

function populateContainer(meme){
  return `
    <div class="image-container">
      <img src=${meme.url} alt="">
    </div>`
}

if(higher<100){
  window.addEventListener('scroll', scrollHandler)
} 

function scrollHandler(){
  let user = window.scrollY
  let webSite = document.body.scrollHeight
  let height = window.innerHeight
  if(higher>=100){
    // have to remove event listener
      window.removeEventListener('scroll', scrollHandler)
  }

  if(webSite - user < 1000){
    console.log(higher, lower)
    lower=lower + size 
    higher = higher + size 
    displayMemes()
  }
}

getMemes()