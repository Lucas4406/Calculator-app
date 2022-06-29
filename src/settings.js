document.getElementById('toggle-dark-mode').addEventListener('click', async()=>{
    const isDarkMode=await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML=isDarkMode ? 'Dark' : 'Light'
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