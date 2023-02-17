const wrapper = document.querySelector(".input-image-wrapper")
const message = document.querySelector("#message")
const input = document.querySelector("#image-input")
const img = document.querySelector("#image-preview")

input.addEventListener('change', processFile)

function processFile(e, fileObject) {
    let file = fileObject || e.target.files[0]
    console.log(file)
    
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.addEventListener("loadend", renderPreview)
}

function renderPreview(e) {
    let fileBuffer = e.target.result
    console.log(fileBuffer)
    img.src = fileBuffer
    message.style.display = "none"
    wrapper.hover(false)
}

function previewUpdate(e) {
    if(input.files.length < 1){
        message.style.display = "visible"
        message.innerHTML = "Clique para adicionar/alterar"

    }else{
        message.style.display = "none"
        console.log(input.files)
        processFile(null, input.files[0])
    }
}

document.addEventListener("DOMContentLoaded", previewUpdate)