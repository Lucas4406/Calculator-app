const pageText=document.getElementById("text-pagina")
const body = document.querySelector("body")
document.getElementById('toggle-dark-mode').addEventListener('click', async()=>{
    const isDarkMode=await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML=isDarkMode ? 'Dark' : 'Light'
})
document.getElementById('toggle-dark-mode').addEventListener('click', ()=>{
    console.log(body.style)
    if(nativeTheme.shouldUseDarkColors){
        pageText.innerText='Hello'
    }
    else{
        pageText.innerText='bye'
    }
    console.log(document)
    /* pageText.innerText='' */
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