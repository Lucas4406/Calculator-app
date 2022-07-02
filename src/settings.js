const pageText=document.getElementById("text-pagina")
const body = document.querySelector("body")
document.getElementById('toggle-dark-mode').addEventListener('click', async()=>{
    const isDarkMode=await window.darkMode.toggle();
    if(isDarkMode){
        pageText.innerText='You are using: Dark mode'
        pageText.classList.add("active")
    }
    else{
        pageText.innerText='You are using: Light mode'
        pageText.classList.remove("active")
    }
})

const closeBtn = document.getElementById("close-button")
const minBtn = document.getElementById("minimize-button")
closeBtn.addEventListener("click" , closeApp)
minBtn.addEventListener("click", minApp)
function closeApp(){
    app.window.close()
}
function minApp(){
    app.window.minimize()
}
const homeBtn = document.getElementById("homeButton")
homeBtn.addEventListener("click", ()=>{
    window.location.assign("index.html")
})


//butoane
const maxBtn = document.getElementById("maximizeBtn")
const miniBtn = document.getElementById("minimizeBtn")
maxBtn.addEventListener("click" , maximizeApp)
miniBtn.addEventListener("click", unmaximizeApp)
function maximizeApp(){
    app.window.maximize()
}
function unmaximizeApp(){
    app.window.unmaximize()
}